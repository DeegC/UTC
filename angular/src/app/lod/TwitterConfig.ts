
/*
  Generated from LOD TwitterConfig

*/

import * as zeidon from '../zeidon';
import { Observable } from 'rxjs';
import { UTC_DomainList } from './UTC-DomainList';
import { UTC_DomainFunctions } from './UTC-DomainFunctions';



// TwitterConfig LOD.
export class TwitterConfig extends zeidon.ObjectInstance {
    protected rootEntityName(): string { return "TwitterConfig" };

    public getApplicationName(): String { return "UTC" };

    getPrototype(entityName: string): any {
        return TwitterConfigEntityPrototypes[entityName];
    }

    public getLodDef() {
        return TwitterConfig_LodDef;
    };

    public getDomain( name: string ): zeidon.Domain { 
        return UTC_DomainList[name];
    };

    public getDomainFunctions( domain: zeidon.Domain ): zeidon.DomainFunctions {
        let f = UTC_DomainFunctions[ domain.class ];
        if ( f )
            return new f( domain );

        return undefined;
    }

    get Twitter(): zeidon.EntityArray<TwitterConfig_Twitter> {
        return this.roots as zeidon.EntityArray<TwitterConfig_Twitter>;
    }

    get Twitter$(): TwitterConfig_Twitter {
        return this.roots.selected() as TwitterConfig_Twitter;
    }

    public static activate( qual?: any ): Observable<TwitterConfig> {
        return zeidon.ObjectInstance.activateOi( new TwitterConfig(), qual );
    }
}


export class TwitterConfig_Twitter extends zeidon.EntityInstance {
    public get entityName(): string { return "Twitter" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get ConsumerKey(): string { return this.getAttribute("ConsumerKey") };
    set ConsumerKey(value: string) { this.setAttribute("ConsumerKey", value) };

    get ConsumerSecret(): string { return this.getAttribute("ConsumerSecret") };
    set ConsumerSecret(value: string) { this.setAttribute("ConsumerSecret", value) };

    get AccessToken(): string { return this.getAttribute("AccessToken") };
    set AccessToken(value: string) { this.setAttribute("AccessToken", value) };

    get AccessTokenSecret(): string { return this.getAttribute("AccessTokenSecret") };
    set AccessTokenSecret(value: string) { this.setAttribute("AccessTokenSecret", value) };

    get Username(): string { return this.getAttribute("Username") };
    set Username(value: string) { this.setAttribute("Username", value) };

    get TweetPeriodInMinutes(): number { return this.getAttribute("TweetPeriodInMinutes") };
    set TweetPeriodInMinutes(value: number) { this.setAttribute("TweetPeriodInMinutes", value) };
}

const TwitterConfigEntityPrototypes = {
    Twitter: TwitterConfig_Twitter.prototype, 
}

export const TwitterConfig_LodDef = {
    name: "TwitterConfig",
    entities: {
        Twitter: {
            name:        "Twitter",
            erToken:     "905181370",
            create:      true,
            cardMax:     0,
            hasInit:     false,
            creatable:   true,
            includable:  false,
            deletable:   true,
            excludable:  false,
            updatable:   true,
            parentDelete: true,
            childEntities: {
            },
            attributes: {
                Id: {
                    name:         "Id",
                    hidden:       false,
                    required:     true,
                    domainName:   "GeneratedKey",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   false,
                },
                ConsumerKey: {
                    name:         "ConsumerKey",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                ConsumerSecret: {
                    name:         "ConsumerSecret",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                AccessToken: {
                    name:         "AccessToken",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                AccessTokenSecret: {
                    name:         "AccessTokenSecret",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Username: {
                    name:         "Username",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                TweetPeriodInMinutes: {
                    name:         "TweetPeriodInMinutes",
                    hidden:       false,
                    required:     false,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
            }
        },

    }
}
