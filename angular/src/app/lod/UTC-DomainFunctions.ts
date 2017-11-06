import * as domains from "../zeidon-domains"

export const UTC_DomainFunctions = {
    "com.quinsoft.zeidon.domains.BooleanDomain": new domains.BooleanDomainFunctions(),
    "com.quinsoft.zeidon.domains.IntegerDomain": new domains.IntegerDomainFunctions(),
    "com.quinsoft.zeidon.domains.StringDomain": new domains.StringDomainFunctions(),
    "com.quinsoft.zeidon.domains.DoubleDomain": new domains.DoubleDomainFunctions(),
    "com.quinsoft.zeidon.domains.StaticTableDomain": new domains.StaticTableDomainFunctions(),
}
