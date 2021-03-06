import {
  CampaignUserSummaries,
  Owned,
  Shareable,
  Timestamped,
  UserID,
} from "./utils";

export interface Campaign extends Timestamped {
  /** Player-facing name of campaign */
  name: string;
  /** Color for campaign to display in UI */
  color?: string;
  /** Player-facing description of campaign, e.g. backstory */
  description?: string;
  /** The id(s) of user(s) running the campaign, i.e. the campaign owners */
  dmUserIds?: UserID[];
  /** The emails of user(s) currently with pending invites to DM */
  dmInviteEmails?: string[];
  /** The ids of users participating in the campaign as players */
  playerUserIds?: UserID[];
  /** Auto-updated summaries of users to be able to display role, ID, name, and character name (if player) without DB lookups. */
  userSummaries?: CampaignUserSummaries;
  /** The emails of user(s) currently with pending invites to play */
  playerInviteEmails?: string[];
  /** Current mode, determines the view displayed to players and DMs */
  mode: "combat" | "out-of-combat";
}

export interface Note extends Owned, Shareable, Timestamped {
  /** Optional title of note */
  title?: string;
  /** The content of the note in ____ format */
  body: string;
  /** Optional tags to assign to the note for searching */
  tags?: string[];
}

/** Something logged at a particular moment in time. */
export interface LogItem extends Timestamped {
  type:
    | "campaign created"
    | "campaign updated"
    | "player invited"
    | "player uninvited"
    | "dm invited"
    | "dm uninvited"
    | "player invite accepted"
    | "dm invite accepted"
    | "player invite declined"
    | "dm invite declined"
    | "item"
    | "note"
    | "spell"
    | "rule"
    | "chat"; // Add types as they are needed here
  message?: string;
  payload?: any;
  sourceUserIds?: UserID[];
  targetUserIds?: UserID[];
  userSummaries?: CampaignUserSummaries;
}

export interface Audio extends Owned, Shareable, Timestamped {
  name: string;
  description?: string;
  isPlaying?: boolean;
  isLooped?: boolean;
  defaultVolume?: number;
  /** Path to file in Firebase Storage, e.g. "campaigns/camp1/cave.mp3" */
  filePath: string;
}

/** A pinned location on a map. */
export interface WorldMapPin {
  /** Relative location of pin on the map in percentages so it can be used on any size of the map */
  location: { xPercentage: number; yPercentage: number };
  /** Optional displayed name of the map */
  name?: string;
  /** Optional displayed description of the map or what it presents */
  description?: string;
  /** If set, should display a link to another map along with the thumbnail of that map */
  targetMapID?: string;
}

export interface WorldMap extends Owned, Shareable, Timestamped {
  /** Optional parent map for navigation purposes */
  parentMapId?: string;
  name?: string;
  description?: string;
  pins?: WorldMapPin[];
}

export interface BattleMapBGImage {
  /** Full path to image in Firebase Storage */
  filePath: string;
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
  /** x-coordinate in pixels */
  x: number;
  /** y-coordinate in pixels */
  y: number;
  rotation: number;
}

export interface BattleMapToken extends Shareable, Timestamped {
  /** Full path to thumbnail image in Firebase Storage */
  thumbnailFilePath: string;
  type: "creature" | "character";
  /** ID of creature or character the token is associated with */
  sourceId: string;
  /** x-coordinate in pixels */
  x: number;
  /** y-coordinate in pixels */
  y: number;
  /** Whether or not players can see this token */
  isVisible: boolean;
}

export interface BattleMap extends Owned, Shareable, Timestamped {
  /** User-facing name for map */
  name: string;
  /** Determines whether players can see and open the battle map */
  isActive: boolean;
  /** Background images that make up the map setting */
  backgroundImages?: BattleMapBGImage[];
  /** Full path to thumbail image in Firebase Storage */
  thumbnailFilePath?: string;
  /** The size in pixels of a single cell, representing 5 feet */
  gridCellSize: number;
  /** The number of pixels across the grid is */
  gridTotalWidth: number;
  /** The number of pixels in height the grid is */
  gridTotalHeight: number;
}
