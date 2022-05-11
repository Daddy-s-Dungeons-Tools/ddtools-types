const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"] as const;

const SKILLS = [
  "acrobatics",
  "animal handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleight of Hand",
  "stealth",
  "survival",
] as const;

const SIZES = [
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
] as const;

const ALIGNMENTS = [
  "lawful good",
  "neutral good",
  "chaotic good",
  "lawful neutral",
  "true neutral",
  "chaotic neutral",
  "lawful evil",
  "neutral evil",
  "chaotic evil",
] as const;

const DAMAGE_TYPES = [
  "piercing",
  "slashing",
  "bludgeoning",
  "acid",
  "cold",
  "fire",
  "force",
  "lightning",
  "necrotic",
  "posion",
  "psychic",
  "radiant",
  "thunder",
] as const;

const CONDITIONS = [
  "blinded",
  "charmed",
  "deafened",
  "exhaustion",
  "frightened",
  "grappled",
  "incapacitated",
  "invisible",
  "necrotic",
  "paralyzed",
  "petrified",
  "poisoned",
  "prone",
  "restrained",
  "stunned",
  "unconscious",
] as const;

const SENSES = [
  "blindsight",
  "darkvision",
  "tremorsense",
  "truesight",
] as const;

const SPELL_COMPONENTS = ["v", "s", "m"] as const;

export interface FirestoreDoc {
  ref: any;
  id: any;
}

export interface Campaign extends FirestoreDoc {
  /** Player-facing name of campaign */
  name: string;
  /** Player-facing description of campaign */
  description?: string;
  /** Public URLs to world maps */
  worldMapUrls?: string[];
  /** The id(s) of user(s) running the campaign, i.e. the campaign owners */
  dmUserIds?: string[];
  /** The emails of user(s) currently with pending invites to DM */
  dmInviteEmails?: string[];
  /** List of notes only DMs can access */
  dmNotes?: Note[];
  /** The ids of users participating in the campaign as players */
  playerUserIds?: string[];
  /** The emails of user(s) currently with pending invites to play */
  playerInviteEmails?: string[];
  /** List of notes */
  playerNotes?: Note[];
}

export interface Note {
  /** Creator and owner of note */
  authorUserId: string;
  /** Optional title of note */
  title?: string;
  /** The content of the note in ____ format */
  body: string;
  /** When the note was created */
  timestamp: number;
  /** Who can view the note */
  visibility: "owners" | "all";
}

export interface User {}

export interface Creature {
  /** The name of the creature */
  name: string;
  /** The creature's current size */
  size: typeof SIZES[number];
  /** The creature's current speeds */
  speed: {
    /** The basic speed show on the character sheet */
    walking: number;
    climbing: number;
    swimming: number;
    flying: number;
    burrowing: number;
  };
  /** The creature's ability scores */
  abilityScores: {
    [ability in typeof ABILITIES[number]]: number;
  };
  /** The creature's hitpoint info */
  hitPoints: {
    current: number;
    temporary: number;
    max: number;
  };
  // hasShield: boolean; // TODO: determine if needed
  /** The creature's current armor class */
  armorClass: number;
  /** The creature's passive perception/wisdom */
  passivePerception: number;
  /** The creature's skill values (taking into consideration proficiencies, expertises, etc.) */
  skills: {
    [skill in typeof SKILLS[number]]: number;
  };
  /** List of skills the creature is proficient in */
  skillProficiencies: typeof SKILLS[number][];
  /** List of skills the creature has expertise in */
  skillExpertises: typeof SKILLS[number][];
  /** The creature's saving throw modifiers (taking into consideration proficiencies, etc.) */
  savingThrows: {
    [ability in typeof ABILITIES[number]]: number;
  };
  /** The saving throws the creature is proficient in  */
  savingThrowProficiencies: typeof ABILITIES[number][];
  /** The creature's understood languages */
  languages: string[];
  /** The special senses the creature has and their ranges in feet (https://www.dndbeyond.com/sources/basic-rules/monsters#Senses) */
  senses: {
    [sense in typeof SENSES[number]]: number;
  };
  /** The creature's current conditions */
  conditions: typeof CONDITIONS[number][];
  /** List of conditions the creature is immune to */
  conditionImmunities: typeof CONDITIONS[number][];
  /** List of damage types the creature is immune to */
  damageImmunities: typeof DAMAGE_TYPES[number][];
  /** List of damage types the creature has resistance to */
  damageResistances: typeof DAMAGE_TYPES[number][];
  /** List of damage types the creature is vulnerable to */
  damageVulnerabilities: typeof DAMAGE_TYPES[number][];
  /** The creature's tags (https://www.dndbeyond.com/sources/basic-rules/monsters#Tags) */
  tags: string[];
}

export interface Character extends Creature {
  /** The character's optional nickname */
  nickname?: string;
  /** The character's current experience points (if used in campaign) */
  xp: number;
  /** The character's race */
  race: Race;
  /** The character's class(es) */
  classes: Class[];
  /** The character's moral alignment */
  alignment: typeof ALIGNMENTS[number];
  /** The character's current proficiency bonus */
  proficiencyBonus: number;
  /** Whether the character is currently inspired */
  hasInspiration: boolean;
  /** The character's hit dice info */
  hitDice: {
    current: number;
    max: number;
  };
  /** The character's current death saves info */
  deathSaves: {
    successes: number;
    failures: number;
  };
  /** The character's physical attribute descriptions */
  physical: {
    age: number;
    eyes: string;
    hair: string;
    skin: string;
    height: number;
    weight: number;
    description: string;
  };
  /** The character's personality descriptions */
  personality: {
    traits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
    backstory: string;
  };
  /** The character's feats */
  feats: Feat[];
  weaponProficiencies: string[];
  armorProficiencies: string[];
  toolProficiencies: string[];
  /** The character's current spells */
  spells?: Spell[];
  /** The character's weapons (equipped and not) */
  weapons: Weapon[];
  /** The character's currently equipped items */
  equipment: Equipment[];
  /** The character's current loot */
  treasure: {
    platinum: number;
    // electrum: number; // Aaron hates electrum
    gold: number;
    silver: number;
    copper: number;
  };
}

export interface Race {
  name: string;
  subtype?: string;
  source?: Source;
}

export interface Class {
  name: string;
  spellcastingAbility?: typeof ABILITIES[number];
  /** The classes current level */
  level: number;
  source?: Source;
}

export interface Item {
  name: string;
  description: string;
  isMagic: boolean;
  weight: number;
  source?: Source;
}

export interface Weapon extends Item {
  category: string;
  damage: {
    diceRoll: DiceRoll;
    type: typeof DAMAGE_TYPES[number];
  };
  range: Range;
  throwRange: Range;
  isEquipped: boolean;
}

export interface DiceRoll {
  /** The dice to roll */
  sides: number;
  /** The number of times to roll the `sides`-sided dice */
  count: number;
  /** The modifier to add onto the roll value */
  modifier: number;
}

export interface Range {
  normal: number;
  long: number;
}

export interface Equipment extends Item {
  quantity: number;
}

export interface Feat {
  name: string;
  description: string;
  source?: Source;
}

export interface SpellDuration {
  type: "timed" | "instant";
  duration?: {
    type: "round" | "hour" | "day";
    amount: number;
  };
  /** When the spell ends */
  ends?: string[];
  concentration?: boolean;
}

export interface SpellRange {
  type: "point" | "cone" | "cube" | "cylinder" | "line" | "sphere";
  distance: {
    type: "self" | "feet" | "touch";
    amount?: number;
  };
}

export interface Spell {
  name: string;
  /** Description of spell and effects */
  entries: string[];
  /** Spell level where 0 means cantrip */
  level: number;
  /** How long it takes to cast the spell */
  time: {
    number: number;
    unit: "action" | "bonus" | "reaction" | "minute";
  }[];
  /** How far you can cast the spell */
  range: SpellRange;
  /** Required components to cast the spell */
  components: {
    [component in typeof SPELL_COMPONENTS[number]]:
      | boolean
      | {
          text: string;
          cost: number;
        };
  };
  /** Duration of spell effect */
  duration: SpellDuration[];
  meta?: {
    ritual?: boolean;
  };
  school: string; // TODO: list out schools
  /** The possible damage types the spell inflicts */
  damageInflict: typeof DAMAGE_TYPES[number][];
  /** The possible conditions the spell inflicts */
  conditionInflict: typeof CONDITIONS[number][];
  /** The possible saving throws the target has to roll */
  savingThrow: typeof ABILITIES[number][];
  spellAttack: string[];
  tags: string[];
  source?: Source;
}

export interface Source {
  name: string;
  pages: number[];
}
