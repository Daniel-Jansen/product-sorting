export class ProductInfo {
    constructor(
        public country_name : string ,
        public currency: string ,
        public categories : string[] ,
        public packages : PackageInfo ,
    ) {  }
}

export class PackageInfo {
    constructor(
        public id : string ,
        public price : BigInteger ,
        public amount : string ,
    ) {  }
}