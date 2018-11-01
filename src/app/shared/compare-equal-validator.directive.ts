import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[appCompareEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CompareEqualValidatorDirective,
        multi: true
    }]
})

export class CompareEqualValidatorDirective implements Validator {

    validate(passwordGroup: AbstractControl): { [key: string]: any } | null {
        const passwordControl = passwordGroup.get('password');
        const confirmPasswordControl = passwordGroup.get('confirmPassword');

        if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
            return { 'notEqual': true };
        }
        return null;
    }
}
