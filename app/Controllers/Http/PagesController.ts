// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
    public index() {
        var value = void 0;

        this.doNothing(value);

        return "Hello World";
    }

    public doNothing(value: string) {
        console.log(value)
    }
}
