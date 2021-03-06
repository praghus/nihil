import { ENTITIES_TYPE } from './entities'

export const ITEMS_TYPE = {
    AXE: 'axe',
    BALL: 'ball',
    COCONUTS: 'coconuts',
    COIN: 'coin',
    CHAIN: 'chain',
    CHOPPER: 'chopper',
    CRANK: 'crank',
    CROWBAR: 'crowbar',
    FLAG: 'flag',
    FLOUR: 'flour',
    LEVER: 'lever',
    HAMMER: 'hammer',
    HANDLE: 'handle',
    HAY: 'hay',
    HEAVY_KEY: 'heavy_key',
    KEY: 'key',
    KNOCKER: 'knocker',
    LINE: 'line',
    MAP: 'map',
    MEDICINE: 'medicine',
    NAILS: 'nails',
    OILER: 'oiler',
    PIPE: 'pipe',
    PLANK: 'plank',
    SAW: 'saw',
    SCISSORS: 'scissors',
    SCYTHE: 'scythe',
    SHEEP: 'sheep',
    SPADE: 'spade',
    STICK: 'stick',
    STONE: 'stone',
    SULFUR: 'sulfur',
    TAR: 'tar',
    TNT: 'tnt',
    TOOLS: 'tools',
    WEIGHT: 'weight'
}

const item = { type: ENTITIES_TYPE.ITEM, width: 16, height: 16, visible: true }

export const ITEMS = {
    [ITEMS_TYPE.AXE]: { ...item, name: 'Axe', gid: 1125, properties: { id: ITEMS_TYPE.AXE } },
    [ITEMS_TYPE.BALL]: { ...item, name: 'Crystal ball', gid: 1145, properties: { id: ITEMS_TYPE.BALL } },
    [ITEMS_TYPE.COCONUTS]: { ...item, name: 'Coconuts', gid: 1156, properties: { id: ITEMS_TYPE.COCONUTS } },
    [ITEMS_TYPE.COIN]: { ...item, name: 'Golden coin', gid: 1151, properties: { id: ITEMS_TYPE.COIN } },
    [ITEMS_TYPE.CHAIN]: { ...item, name: 'Chain', gid: 1159, properties: { id: ITEMS_TYPE.CHAIN } },
    [ITEMS_TYPE.CHOPPER]: { ...item, name: 'Chopper', gid: 1148, properties: { id: ITEMS_TYPE.CHOPPER } },
    [ITEMS_TYPE.CRANK]: { ...item, name: 'Crank', gid: 1146, properties: { id: ITEMS_TYPE.CRANK } },
    [ITEMS_TYPE.CROWBAR]: { ...item, name: 'Crowbar', gid: 1123, properties: { id: ITEMS_TYPE.CROWBAR } },
    [ITEMS_TYPE.FLAG]: { ...item, name: 'Flag', gid: 1134, properties: { id: ITEMS_TYPE.FLAG } },
    [ITEMS_TYPE.FLOUR]: { ...item, name: 'Sack of flour', gid: 1154, properties: { id: ITEMS_TYPE.FLOUR } },
    [ITEMS_TYPE.LEVER]: { ...item, name: 'Lever', gid: 1155, properties: { id: ITEMS_TYPE.LEVER } },
    [ITEMS_TYPE.HAMMER]: { ...item, name: 'Hammer', gid: 1152, properties: { id: ITEMS_TYPE.HAMMER } },
    [ITEMS_TYPE.HANDLE]: { ...item, name: 'Handle', gid: 1143, properties: { id: ITEMS_TYPE.HANDLE } },
    [ITEMS_TYPE.HAY]: { ...item, name: 'Hay', gid: 1157, properties: { id: ITEMS_TYPE.HAY } },
    [ITEMS_TYPE.HEAVY_KEY]: { ...item, name: 'Heavy key', gid: 1139, properties: { id: ITEMS_TYPE.HEAVY_KEY } },
    [ITEMS_TYPE.KEY]: { ...item, name: 'Key', gid: 1132, properties: { id: ITEMS_TYPE.KEY } },
    [ITEMS_TYPE.KNOCKER]: { ...item, name: 'Knocker', gid: 1133, properties: { id: ITEMS_TYPE.KNOCKER } },
    [ITEMS_TYPE.LINE]: { ...item, name: 'Line', gid: 1126, properties: { id: ITEMS_TYPE.LINE } },
    [ITEMS_TYPE.MAP]: { ...item, name: 'Map', gid: 1135, properties: { id: ITEMS_TYPE.MAP } },
    [ITEMS_TYPE.MEDICINE]: { ...item, name: 'Medicine', gid: 1129, properties: { id: ITEMS_TYPE.MEDICINE } },
    [ITEMS_TYPE.NAILS]: { ...item, name: 'Nails', gid: 1147, properties: { id: ITEMS_TYPE.NAILS } },
    [ITEMS_TYPE.OILER]: { ...item, name: 'Oiler', gid: 1137, properties: { id: ITEMS_TYPE.OILER } },
    [ITEMS_TYPE.PIPE]: { ...item, name: 'Pipe', gid: 1138, properties: { id: ITEMS_TYPE.PIPE } },
    [ITEMS_TYPE.PLANK]: { ...item, name: 'Plank', gid: 1144, properties: { id: ITEMS_TYPE.PLANK } },
    [ITEMS_TYPE.SAW]: { ...item, name: 'Saw', gid: 1127, properties: { id: ITEMS_TYPE.SAW } },
    [ITEMS_TYPE.SCISSORS]: { ...item, name: 'Scissors', gid: 1149, properties: { id: ITEMS_TYPE.SCISSORS } },
    [ITEMS_TYPE.SCYTHE]: { ...item, name: 'Scythe', gid: 1142, properties: { id: ITEMS_TYPE.SCYTHE } },
    [ITEMS_TYPE.SHEEP]: { ...item, name: 'Sheep', gid: 1150, properties: { id: ITEMS_TYPE.SHEEP } },
    [ITEMS_TYPE.SPADE]: { ...item, name: 'Spade', gid: 1124, properties: { id: ITEMS_TYPE.SPADE } },
    [ITEMS_TYPE.STICK]: { ...item, name: 'Fishing rod', gid: 1131, properties: { id: ITEMS_TYPE.STICK } },
    [ITEMS_TYPE.STONE]: { ...item, name: 'Heavy stone', gid: 1136, properties: { id: ITEMS_TYPE.STONE, solid: true } },
    [ITEMS_TYPE.SULFUR]: { ...item, name: 'Sulfur', gid: 1141, properties: { id: ITEMS_TYPE.SULFUR } },
    [ITEMS_TYPE.TAR]: { ...item, name: 'Tar', gid: 1140, properties: { id: ITEMS_TYPE.TAR } },
    [ITEMS_TYPE.TNT]: { ...item, name: 'Dynamite', gid: 1122, properties: { id: ITEMS_TYPE.TNT } },
    [ITEMS_TYPE.TOOLS]: { ...item, name: 'Tools', gid: 1153, properties: { id: ITEMS_TYPE.TOOLS } },
    [ITEMS_TYPE.WEIGHT]: { ...item, name: 'Weight', gid: 1128, properties: { id: ITEMS_TYPE.WEIGHT } }
}
