export class ProductInfo {
    constructor(
        public name : string ,
        public country_name : string ,
        public currency: string ,
        public categories : string[] ,
        public packages : RangeInfo ,
    ) {  }
}

export class RangeInfo {
    constructor(
        public max : number ,
        public test : string ,
    ) {  }
}