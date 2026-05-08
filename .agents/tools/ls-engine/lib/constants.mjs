export {
  brainOnlyPackageScripts,
  brainPackageScripts,
  requiredSatellitePaths,
  satellitePackageScripts,
  tierNames
} from "./layer-policy.mjs";

export const requiredSpecMarkers = [
  "Strategic Context",
  "Logic Visualization",
  "Data Schema",
  "Technical Contract",
  "Definition of Done"
];

export const placeholderPatterns = [
  /\[[^\]\r\n]*(Tên|Dự án|Số hiệu|Draft|Approved|In Progress|P0|P1|P2|Pain point|ICP|Link|Mô tả|Dùng|Mobile|Tablet|Desktop|RBAC|Scopes|JWT|Danh sách|None|TBD|TODO)[^\]\r\n]*\]/iu,
  /\[(TODO|TBD|FIXME|REPLACE|PLACEHOLDER)[^\]\r\n]*\]/iu,
  /<replace/iu,
  /lorem ipsum/iu
];
