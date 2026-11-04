(() => {
  const filterCards = (buttonsSelector, cardsSelector, dataKey, cardKey, statusSelector, noun) => {
    const buttons = document.querySelectorAll(buttonsSelector);
    const cards = document.querySelectorAll(cardsSelector);
    const status = document.querySelector(statusSelector);
    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset[dataKey];
        let visibleCount = 0;
        buttons.forEach((item) => {
          const selected = item === button;
          item.classList.toggle('is-selected', selected);
          item.setAttribute('aria-pressed', String(selected));
        });
        cards.forEach((card) => {
          const visible = filter === 'all' || card.dataset[cardKey] === filter;
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        });
        if (status) status.textContent = `${visibleCount} ${noun} shown.`;
      });
    });
  };

  filterCards('[data-program-filter]', '.program-item', 'programFilter', 'category', '.filter-status', 'programs');
  filterCards('[data-news-filter]', '.news-item', 'newsFilter', 'newsCategory', '.filter-status', 'updates');

  const registration = document.querySelector('#registrationForm');
  if (registration) {
    const fields = {
      fullName: { input: registration.elements.fullName, error: '#fullNameError', message: 'Enter your full name.' },
      studentEmail: { input: registration.elements.email, error: '#studentEmailError', message: 'Enter a valid email address.' },
      studentPhone: { input: registration.elements.phone, error: '#studentPhoneError', message: 'Enter a phone number using 7–20 digits, spaces, plus signs, or hyphens.' },
      desiredProgram: { input: registration.elements.program, error: '#desiredProgramError', message: 'Choose a program.' },
      studyMode: { input: registration.querySelector('input[name="studyMode"]'), error: '#studyModeError', message: 'Choose a study mode.' },
      intakeDate: { input: registration.elements.intake, error: '#intakeDateError', message: 'Choose your intended intake date.' },
      studentPassword: { input: registration.elements.password, error: '#studentPasswordError', message: 'Use at least 8 characters for your password.' },
      confirmPassword: { input: registration.elements.confirmPassword, error: '#confirmPasswordError', message: 'Enter the same password again.' },
      termsAgreement: { input: registration.elements.agreement, error: '#termsAgreementError', message: 'Please agree before continuing.' }
    };
    const feedback = registration.querySelector('#registrationFeedback');
    const setError = (input, message, target) => {
      const error = registration.querySelector(target);
      error.textContent = message;
      input.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', String(Boolean(message)));
    };
    const validate = (name) => {
      const field = fields[name];
      const input = field.input;
      let message = '';
      if (name === 'studyMode') {
        if (!registration.querySelector('input[name="studyMode"]:checked')) message = field.message;
      } else if (name === 'confirmPassword') {
        if (!input.value) message = 'Confirm your password.';
        else if (input.value !== registration.elements.password.value) message = 'Passwords do not match.';
      } else if (name === 'studentPassword' && input.value.length < 8) {
        message = field.message;
      } else if (!input.checkValidity()) {
        message = input.validity.valueMissing ? field.message : (input.validity.typeMismatch ? field.message : `Check this field. ${input.validationMessage}`);
      }
      setError(input, message, field.error);
      return !message;
    };

    Object.keys(fields).forEach((name) => {
      const input = fields[name].input;
      input.addEventListener('blur', () => validate(name));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) validate(name);
        feedback.textContent = '';
        feedback.className = 'form-feedback';
      });
      input.addEventListener('change', () => validate(name));
    });
    registration.querySelectorAll('input[name="studyMode"]').forEach((input) => {
      input.addEventListener('change', () => validate('studyMode'));
    });
    registration.elements.password.addEventListener('input', () => {
      if (registration.elements.confirmPassword.value) validate('confirmPassword');
    });
    registration.addEventListener('submit', (event) => {
      event.preventDefault();
      const valid = Object.keys(fields).map(validate).every(Boolean);
      if (!valid) {
        feedback.textContent = 'Please review the highlighted fields and try again.';
        feedback.className = 'form-feedback is-error';
        const firstInvalid = registration.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      feedback.textContent = 'Thank you! Your details passed validation. In this demo, they are not sent or stored; contact admissions to continue.';
      feedback.className = 'form-feedback is-success';
      feedback.focus?.();
    });
  }

  const contact = document.querySelector('#contactForm');
  if (contact) {
    const names = ['name', 'email', 'subject', 'message'];
    const labels = { name: 'Enter your name.', email: 'Enter a valid email address.', subject: 'Enter a subject.', message: 'Write a message of at least 10 characters.' };
    const feedback = contact.querySelector('#contactFeedback');
    const validate = (name) => {
      const input = contact.elements[name];
      const error = contact.querySelector(`#contact${name[0].toUpperCase()}${name.slice(1)}Error`);
      let message = '';
      if (!input.checkValidity()) message = input.validity.valueMissing ? labels[name] : (input.validity.typeMismatch ? labels[name] : `Please provide at least ${input.minLength} characters.`);
      error.textContent = message;
      input.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', String(Boolean(message)));
      return !message;
    };
    names.forEach((name) => {
      const input = contact.elements[name];
      input.addEventListener('blur', () => validate(name));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) validate(name);
        feedback.textContent = '';
        feedback.className = 'form-feedback';
      });
    });
    contact.addEventListener('submit', (event) => {
      event.preventDefault();
      if (contact.elements.website.value.trim()) {
        feedback.textContent = 'Your message could not be accepted. Please contact admissions by email instead.';
        feedback.className = 'form-feedback is-error';
        return;
      }
      const valid = names.map(validate).every(Boolean);
      if (!valid) {
        feedback.textContent = 'Please review the highlighted fields and try again.';
        feedback.className = 'form-feedback is-error';
        const firstInvalid = contact.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      feedback.textContent = 'Thank you for reaching out. This demo does not transmit messages; please use the email or phone number listed on this page.';
      feedback.className = 'form-feedback is-success';
      contact.reset();
    });
  }

  const programFromUrl = new URLSearchParams(window.location.search).get('program');
  if (programFromUrl) {
    const select = document.querySelector('#desiredProgram');
    if (select && Array.from(select.options).some((option) => option.value === programFromUrl)) select.value = programFromUrl;
  }
})();
