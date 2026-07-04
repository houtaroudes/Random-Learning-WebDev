const inputs = document.querySelectorAll('.otp-input');
        const blobs = document.querySelectorAll('.blob');
        const card = document.getElementById('otpCard');
        const btn = document.getElementById('submitBtn');

        // Input & Blob Sync Logic
        inputs.forEach((input, index) => {
            // Focus styling
            input.addEventListener('focus', () => blobs[index].classList.add('is-focused'));
            input.addEventListener('blur', () => blobs[index].classList.remove('is-focused'));

            // Typing logic
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^0-9]/g, '');
                if (input.value) {
                    blobs[index].classList.add('has-value');
                    if (index < 5) inputs[index + 1].focus();
                } else {
                    blobs[index].classList.remove('has-value');
                }
            });

            // Backspace navigation
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !input.value && index > 0) {
                    inputs[index - 1].focus();
                    inputs[index - 1].value = '';
                    blobs[index - 1].classList.remove('has-value');
                }
            });
        });

        // Animation Sequence Trigger
        btn.addEventListener('click', () => {
            const enteredCode = Array.from(inputs).map(i => i.value).join('');
            if(enteredCode.length < 6) return; // Must fill all inputs
            
            if (card.classList.contains('submitting')) return; // Prevent double clicks
            
            btn.innerText = "Processing...";
            card.classList.add('submitting'); 

            setTimeout(() => card.classList.add('processing'), 800); 
            
            setTimeout(() => {
                card.classList.remove('processing');
                
                if (enteredCode === "123456") {
                    card.classList.add('success'); 
                    btn.innerText = "Verified Successfully";
                    btn.style.background = "var(--success)";
                    btn.style.color = "white";
                } else {
                    card.classList.add('error'); 
                    card.classList.add('error-shake'); 
                    btn.innerText = "Verification Failed";
                    btn.style.background = "var(--error)";
                    btn.style.color = "white";
                }
            }, 2800);
            
            // Auto-reset
            setTimeout(() => {
                card.className = 'card';
                btn.innerText = "Confirm Identity";
                btn.style.background = ""; // Reverts to CSS default
                btn.style.color = "";
                inputs.forEach((i, idx) => { 
                    i.value = ''; 
                    blobs[idx].classList.remove('has-value', 'is-focused'); 
                });
                inputs[0].focus();
            }, 6000);
        });
      