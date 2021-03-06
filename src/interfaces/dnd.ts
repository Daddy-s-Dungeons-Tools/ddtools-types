import {
  SIZES,
  ABILITIES,
  SKILLS,
  SENSES,
  CONDITIONS,
  DAMAGE_TYPES,
  ALIGNMENTS,
  RARITIES,
  ITEM_TYPES,
  SPELL_COMPONENTS,
} from "../constants";
import { Owned, Shareable, Timestamped, Sourced, Entries } from "./utils";

export interface Creature extends Owned, Shareable, Timestamped, Sourced {
  /** The name of the creature */
  name: string;
  /** The creature's current size */
  size: typeof SIZES[number];
  /** The creature's current speeds */
  speed: {
    /** The basic speed shown on the character sheet */
    walking: number;
    climbing: number;
    swimming: number;
    flying: number;
    burrowing: number;
  };
  /** Current initiative of the creature */
  initiative?: number;
  /** The creature's ability scores, which are used to determine modifiers for skills and saving throws */
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
    [skill in typeof SKILLS[number]]: {
      isProficient: boolean;
      isExpertise: boolean;
      /** Optional miscellaneous modifier to add/subtract */
      miscModifier?: number;
    };
  };
  /** The creature's saving throw properties (proficient, etc.) the base value comes from the associated ability */
  savingThrows: {
    [ability in typeof ABILITIES[number]]: {
      isProficient: boolean;
      /** Optional miscellaneous modifier to add/subtract */
      miscModifier?: number;
    };
  };
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
  /** Whether or not this character is actively being used. A player can only have 1 active character per campaign. */
  isActive: boolean;
  /** The character's optional nickname */
  nickname?: string;
  // /** What is revealed to other players */
  // revealedToOtherCharacters: ("abilities" | "alignment" | "background")[];
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
  /** Whether or not character currently has Jack of All Trades (stupid lvl2+ bard thing), adds half of proficiency bonus for skills where not proficient  */
  isJackOfAllTrades: boolean;
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

/** Represents a known race of creatures/characters. */
export interface Race extends Sourced {
  name: string;
  subtype?: string;
  size?: string[];
  speed?: {
    walk?: number;
    fly?: number;
  };
  entries: Entries;
}

export interface ClassFeature extends Sourced {
  name: string;
  level: number;
  entries: Entries;
}

export interface Class extends Sourced {
  name: string;
  spellcastingAbility?: typeof ABILITIES[number];
  /** The classes current level */
  level: number;
  /** The current hit dice values for this class */
  hitDice: {
    /** The type of  */
    sides: 6 | 8 | 10 | 12;
    /** Out of `level` max */
    current: number;
  };
  features: ClassFeature[];
}

export interface Item extends Owned, Shareable, Timestamped, Sourced {
  name: string;
  rarity: typeof RARITIES[number];
  /** M=melee, R=ranged, G=gear, GV=generic variant, SHP=vehicle, MNT=mount, TAH=tack and harness, HA=heavy armor */
  type?: typeof ITEM_TYPES[number];
  typeAlt?: typeof ITEM_TYPES[number];
  armorClass?: number;
  /** Whether the item uses ammunition */
  ammunition?: boolean;
  weight?: number;
  /** Value in copper */
  value?: number;
  entries: Entries;
}

export interface Weapon extends Item {
  weaponCategory: string;
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
  modifier?: number;
}

export interface Range {
  normal: number;
  long: number;
}

export interface Equipment extends Item {
  quantity: number;
}

export interface Feat extends Sourced {
  name: string;
  description: string;
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

export interface Spell extends Sourced {
  name: string;
  /** Description of spell and effects */
  entries: Entries;
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
}
