import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
declare type TParseFormDataJsonOptions = {
    except?: string[];
};
export declare class ParseFormDataJsonPipe implements PipeTransform {
    private options?;
    constructor(options?: TParseFormDataJsonOptions);
    transform(value: any, _metadata: ArgumentMetadata): any;
}
export {};
