
import { describe, it, expect, beforeEach, vi } from 'vitest';

async function loadApp(html, url = '/') {
    document.body.innerHTML = html;
    window.history.replaceState({}, '', url);

    vi.resetModules();

    await import('../js/script.js');
}

// ==========================================
// DOCTOR SEARCH TESTS
// ==========================================

describe('MediBook Doctor Search', () => {
    beforeEach(async () => {
        await loadApp(`
            <input id="doctor-search">
            <select id="doctor-specialty">
                <option value="">All Specialties</option>
                <option>Cardiologist</option>
                <option>General Physician</option>
            </select>
            <input id="doctor-location">
            <button id="doctor-search-button">Search</button>
            <div id="specialty-grid"></div>
            <section class="doctors-results">
                <div id="doctor-list"></div>
            </section>
        `);

        document.querySelector('.doctors-results').scrollIntoView = () => {};
    });

    it('displays the available doctors', () => {
        expect(document.querySelectorAll('.doctor-list-card').length)
            .toBe(6);
    });

    it('filters doctors by name', () => {
        const search = document.querySelector('#doctor-search');
        search.value = 'Ananya';
        search.dispatchEvent(new Event('input'));

        expect(document.querySelectorAll('.doctor-list-card').length)
            .toBe(1);

        expect(document.querySelector('#doctor-list').textContent)
            .toContain('Dr. Ananya Sharma');
    });

    it('filters doctors by specialty', () => {
        const specialty = document.querySelector('#doctor-specialty');
        specialty.value = 'Cardiologist';
        specialty.dispatchEvent(new Event('input'));

        expect(document.querySelectorAll('.doctor-list-card').length)
            .toBe(1);
    });

    it('filters doctors by hospital location', () => {
        const location = document.querySelector('#doctor-location');
        location.value = 'Apollo';
        location.dispatchEvent(new Event('input'));

        expect(document.querySelectorAll('.doctor-list-card').length)
            .toBe(2);
    });

    it('shows a message when no doctors match', () => {
        const search = document.querySelector('#doctor-search');
        search.value = 'Unknown Doctor';
        search.dispatchEvent(new Event('input'));

        expect(document.querySelector('#doctor-list').textContent)
            .toContain('No specialists match');
    });
});

// ==========================================
// LOGIN TESTS
// ==========================================

describe('MediBook Login', () => {
    beforeEach(async () => {
        await loadApp(`
            <form id="login-form">
                <input id="login-email">
                <input id="login-password" type="password">
                <button type="submit">Login</button>
            </form>

            <button data-demo="patient">Patient</button>
            <button data-demo="doctor">Doctor</button>
            <button data-demo="admin">Admin</button>

            <button class="password-toggle">Show</button>

            <div id="demo-details"></div>
            <div id="login-message"></div>
        `);
    });

    it('loads patient demo account details', () => {
        document.querySelector('[data-demo="patient"]').click();

        expect(document.querySelector('#login-email').value)
            .toBe('patient@medibook.demo');
    });

    it('toggles password visibility', () => {
        document.querySelector('.password-toggle').click();

        expect(document.querySelector('#login-password').type)
            .toBe('text');
    });

    it('shows successful demo login message', () => {
        document.querySelector('#login-form')
            .dispatchEvent(new Event('submit', {
                bubbles: true,
                cancelable: true
            }));

        expect(document.querySelector('#login-message').textContent)
            .toContain('Demo sign-in successful');
    });
});

// ==========================================
// APPOINTMENT BOOKING TESTS
// ==========================================

describe('MediBook Appointment Booking', () => {
    beforeEach(async () => {
        await loadApp(`
            <h1 id="booking-doctor"></h1>
            <p id="booking-specialty"></p>

            <form id="booking-form">
                <input id="booking-date" type="date">

                <div class="time-slots" id="time-slots">
                    <button type="button">09:30 AM</button>
                    <button type="button">11:00 AM</button>
                </div>

                <button type="submit">Confirm Appointment</button>

                <div id="booking-message"></div>
            </form>
        `, '/booking.html?doctor=Dr.%20Ananya%20Sharma&specialty=Cardiologist');
    });

    it('displays the selected doctor details', () => {
        expect(document.querySelector('#booking-doctor').textContent)
            .toBe('Dr. Ananya Sharma');

        expect(document.querySelector('#booking-specialty').textContent)
            .toContain('Cardiologist');
    });

    it('rejects booking without selecting a time slot', () => {
        document.querySelector('#booking-form')
            .dispatchEvent(new Event('submit', {
                bubbles: true,
                cancelable: true
            }));

        expect(document.querySelector('#booking-message').textContent)
            .toContain('Please select an available time slot');
    });

    it('confirms booking after selecting a time slot', () => {
        document.querySelector('#time-slots button').click();

        document.querySelector('#booking-form')
            .dispatchEvent(new Event('submit', {
                bubbles: true,
                cancelable: true
            }));

        expect(document.querySelector('#booking-message').textContent)
            .toContain('Appointment confirmed');
    });
});
