import { makeAutoObservable, runInAction } from 'mobx';
import { postToUpdateChatLog } from '../services/ws';
// import { writeContent } from '../utils';
import { MapStore, Marker } from './mapStore';
import writeContent from '../utils/writeContent';
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/src/types';

export const ZoneMenuOption = {
  ZONE_CODE: 'ZONE_CODE',
  MEMBERS: 'MEMBERS',
  LOGS: 'LOGS',
  STATUS: 'STATUS',
  CHAT: 'CHAT',
  LOCATE: 'LOCATE',
  LEAVE: 'LEAVE',
  NONE: '',
};

export class ZoneStore implements Zone {
  map: MapStore;
  zoneId: string;
  zoneName?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  // members: ZoneMember[] = [];
  memberMap = new Map<string, ZoneMember>();
  latestMemberName: string | undefined;
  memberJustLeft: string | undefined;
  chatLog: ZoneChatLogEntry[] = [];
  chatLogLastEntry: ZoneChatLogEntry | undefined;
  focusedMember?: ZoneMember | null;
  focusIntervalId: NodeJS.Timeout | undefined;

  private _toggledMenuOption: string | undefined;
  isDrawerOpen = false;

  constructor(map: MapStore, zone: Zone) {
    makeAutoObservable(this);

    this.map = map;
    this.zoneId = zone.zoneId;
    this.zoneName = zone.zoneName;
    this.createdAt = zone.createdAt;
    this.updatedAt = zone.updatedAt;
    this.createdBy = zone.createdBy;
    this.chatLog = zone.chatLog || [];

    this.initMembers(zone.members);
  }

  private initMembers(members: ZoneMember[]) {
    console.log('initMembers', members);
    for (const member of members) this.addMember(member);
  }

  get members() {
    return Array.from(this.memberMap.values());
  }

  removeMember(userId: string) {
    const member = this.memberMap.get(userId);
    if (!member) return;

    this.memberMap.delete(userId);
    this.memberJustLeft = member.username;
  }

  addMember(member: ZoneMember, hasJustJoined = false) {
    member.message = this.getLastMessage(member);
    const markedMember = this.showOnMap(member);
    this.memberMap.set(member.userId, markedMember);
    if (hasJustJoined) this.latestMemberName = markedMember.username;
  }

  getLastMessage(member: ZoneMember) {
    return this.chatLog
      .slice()
      .reverse()
      .find((entry) => entry.userId === member.userId)?.message;
  }

  setUserEmoji(emojiData: EmojiType) {
    if(!this.currentUser) return;
    const user = this.memberMap.get(this.currentUser.userId);
    if (!user) return;
    user.emoji = emojiData.emoji;
  }
  private showOnMap(member: ZoneMember) {
    const marker: Marker = {
      id: member.userId,
      location: member.location,
      title: member.username,
      body: this.getLastMessage(member) || '',
    };
    member.marker = marker;

    return member;
  }

  get currentUser() {
    return this.map.currentUser;
  }

  updateLocation(userId: string, location: ZoneLocation) {
    const validMember = this.memberMap.get(userId);
    console.log(
      'attempting to update location for user',
      userId,
      'to',
      location
    );
    if (validMember) {
      validMember.location = location;

      this.memberMap.set(userId, validMember);
    }
  }

  clear() {

    this.memberMap.clear();
  }

  setFocus(member: ZoneMember | null) {
    clearInterval(this.focusIntervalId);
    this.focusedMember = member;

    if (!member) return console.log('no member in focus');
    runInAction(() => {
      this.focusIntervalId = setInterval(() => {
        console.log('showing location of focused member');
        this.showLocation(member);
      }, 1000);
    });
  }

  private showLocation(member: ZoneMember) {
    const location = this.getLocation(member);
    if (!location) return console.log('location not found');

    // TODO: Use the map instance from MapStore to pan to the member's location
    // this.map.panTo(location);
  }

  private getLocation({ userId }: { userId: string }) {
    const member = this.memberMap.get(userId);
    if (!member) return console.log('member not found');
    return member.location;
  }

  getMember(username: string) {
    return this.members.find((member) => member.username === username);
  }

  get toggledMenuOption() {
    return this._toggledMenuOption ?? '';
  }

  set toggledMenuOption(option: string) {
    const isDrawerOption = ['MEMBERS', 'LOGS'].includes(option);
    this.isDrawerOpen = isDrawerOption;
    this._toggledMenuOption = option;
  }

  appendChatLog(entry: ZoneChatLogEntry) {
    runInAction(() => {
      this.chatLog = [...this.chatLog, entry];
      this.chatLogLastEntry = entry;
      const member = this.memberMap.get(entry.userId);
      if (member) this.showOnMap(member);
    });
  }

  async sendMessage(message: string) {
    if (!this.currentUser) return console.log('no current user');
    const entry = {
      userId: this.currentUser?.userId,
      username: this.currentUser?.username,
      message,
      createdAt: new Date().toISOString(),
    };

    this.appendChatLog(entry);
    await postToUpdateChatLog(this.zoneId, entry);
  }

  makeLogEntry(username: string, message: string) {
    if (!this.currentUser) return console.log('no current user');
    const entry = {
      userId: this.currentUser?.userId,
      username,
      message,
      createdAt: new Date().toISOString(),
    };

    postToUpdateChatLog(this.zoneId, entry);
  }
}

export const createZone = (map: MapStore, zone: Zone) => {
  map.initZone();
  return new ZoneStore(map, zone);
};

export interface Zone {
  message?: string;
  zoneId: string;
  zoneName?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  members: ZoneMember[];
  chatLog: ZoneChatLogEntry[];
}

export interface ZoneChatLogEntry {
  userId: string;
  username: string;
  message: string;
  createdAt: string;
}

export interface ZoneMember {
  userId: string;
  username: string;
  userColor: string;
  status?: string;
  message?: string;
  marker?: Marker;
  emoji?: string;
  hasInfoWindowOpen?: boolean;
  location: ZoneLocation;
}

export interface ZoneLocation {
  latitude: number;
  longitude: number;
}
