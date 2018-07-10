export const API_HOST = 'http://113.171.23.142:8090/smart-tourist/';

export const GET_MUSEUMLIST = `${API_HOST}api/museum/`;
export const GET_AREA = `${API_HOST}api/area/`;
export const GET_ANTIFACT = `${API_HOST}api/artifact/`;
export const GET_ANTIFACT_BYID = `${API_HOST}api/artifact/get/`;
export const GET_ANTIFACT_BYTAG = `${API_HOST}api/artifact/get-by-tag`;
export const GET_ANTIFACT_BY_UUID = `${API_HOST}api/artifact/get/code`;
export const GET_ANTIFACT_BY_QRCODE = `${API_HOST}api/artifact/get/code`;
export const MAP_NO_FRAME=`${API_HOST}api/view-map-no-frame?mapId=1`