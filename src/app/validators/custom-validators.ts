import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    static notOnlyWhitespace(control: FormControl): ValidationErrors | null {

        if ((control.value != null) && (control.value.trim().length === 0)) {

            return { 'notOnlyWhitespace': true };
        }
        else {
            return null;
        }
    }
    static passwordMissMatch(form: FormGroup): ValidationErrors | null {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
    
        if ((password && confirmPassword) && (password !== confirmPassword)) {
          return { 'passwordMissMatch': true };
        }
    
        return null;
      }
}
