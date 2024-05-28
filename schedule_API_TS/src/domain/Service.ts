
export default class Service {

  constructor (
    readonly title: string,
    readonly price: string,
    readonly duration: string,
    readonly description: string,
    readonly image_url: string,
    readonly is_course: boolean  ) {
  }

  static create (title: string, price: string, duration: string, description: string, image_url: string, is_course: boolean ) {
    return new Service(title, price, duration, description, image_url, is_course);
  }
}