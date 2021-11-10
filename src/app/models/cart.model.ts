/* eslint-disable @typescript-eslint/naming-convention */
export class Cart{
  constructor(
    public id: number,
    public product_id: number,
    public product_title: string,
    public product_description: string,
    public unitPrice: string,
    public qty: number,
    public mainImage: string,
    public image: string[]
  ){

  }

}
