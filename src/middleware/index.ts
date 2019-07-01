import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from './common';

export default [
  handleBodyRequestParsing,
  handleCors,
  handleCompression
];
