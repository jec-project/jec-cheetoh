/*!
 * JEC GlassCat CLI Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-cheetoh" {

import { AbstractLoggerProxy, LoggerProxy } from "jec-commons";

export class CheetohBuilder {    constructor();    build(): Cheetoh;}export interface Cheetoh {    installGpm(sourceUri: string, destinationPath: string, callback: (err: CheetohError) => void): void;}export class DefaultCheetohImpl implements Cheetoh {    constructor();    private initObj();    private sendMessage(message, logLevel?);    installGpm(sourceUri: string, destinationPath: string, callback: (err: CheetohError) => void): void;}export class ManifestManager {    constructor();    private initObj();    private sendMessage(message, logLevel?);}export class CheetohError extends Error {    constructor(message: string);}export class CheetohLoggerProxy extends AbstractLoggerProxy implements LoggerProxy {    constructor();    private static INSTANCE;    private static _locked;    static getInstance(): LoggerProxy;}export class GpmConfig {    constructor();    name: string;    version: string;    target: string;    title: string;    description: string;    author: string;}export class TarballUtil {    constructor();    download(url: string, output: string, callback: (err?: any) => void): void;}}