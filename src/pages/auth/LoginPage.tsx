import React, { useState, FormEvent } from 'react';

const COLLEGE_LOGO_URL = 'src/pages/components/ChatGPT Image Oct 3, 2025, 12_39_46 PM.png';

// SVG pattern: hand-drawn style tossed graduation hats
const drawnHatsPattern = encodeURIComponent(`
<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="160" height="160" fill="#f4f4fa"/>
<g opacity="0.18">
  <g>
    <path d="M30 50 l25 -10 l25 10 l-25 10 Z" stroke="#22223b" stroke-width="2" fill="none"/>
    <ellipse cx="55" cy="60" rx="8" ry="3" fill="#fff" stroke="#22223b" stroke-width="2"/>
    <line x1="55" y1="63" x2="55" y2="72" stroke="#22223b" stroke-width="2"/>
    <circle cx="55" cy="72" r="2" fill="#ac0bf1ff" stroke="#22223b" stroke-width="1"/>
  </g>
  <g transform="rotate(-21 120 40)">
    <path d="M120 40 l20 -8 l20 8 l-20 8 Z" stroke="#ac0bf1ff" stroke-width="2" fill="none"/>
    <ellipse cx="140" cy="48" rx="6" ry="2" fill="#fff" stroke="#ac0bf1ff" stroke-width="2"/>
    <line x1="140" y1="50" x2="140" y2="57" stroke="#ac0bf1ff" stroke-width="2"/>
    <circle cx="140" cy="57" r="2" fill="#22223b" stroke="#ac0bf1ff" stroke-width="1"/>
  </g>
  <g transform="rotate(-8 80 120)">
    <path d="M80 120 l15 -6 l15 6 l-15 6 Z" stroke="#22223b" stroke-width="2" fill="none"/>
    <ellipse cx="95" cy="126" rx="5" ry="2" fill="#fff" stroke="#22223b" stroke-width="2"/>
    <line x1="95" y1="128" x2="95" y2="135" stroke="#22223b" stroke-width="2"/>
    <circle cx="95" cy="135" r="2" fill="#ac0bf1ff" stroke="#22223b" stroke-width="1"/>
  </g>
  <g transform="rotate(17 45 135)">
    <path d="M45 135 l13 -5 l13 5 l-13 5 Z" stroke="#ac0bf1ff" stroke-width="2" fill="none"/>
    <ellipse cx="58" cy="140" rx="4" ry="2" fill="#fff" stroke="#ac0bf1ff" stroke-width="2"/>
    <line x1="58" y1="142" x2="58" y2="148" stroke="#ac0bf1ff" stroke-width="2"/>
    <circle cx="58" cy="148" r="2" fill="#22223b" stroke="#ac0bf1ff" stroke-width="1"/>
  </g>
  <g transform="rotate(-30 140 100)">
    <path d="M140 100 l17 -7 l17 7 l-17 7 Z" stroke="#22223b" stroke-width="2" fill="none"/>
    <ellipse cx="157" cy="107" rx="4" ry="2" fill="#fff" stroke="#22223b" stroke-width="2"/>
    <line x1="157" y1="109" x2="157" y2="115" stroke="#22223b" stroke-width="2"/>
    <circle cx="157" cy="115" r="2" fill="#ac0bf1ff" stroke="#22223b" stroke-width="1"/>
  </g>
</g>
</svg>
`);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Logged in!');
      })
      .catch(err => alert('Login failed'));
  }

  return (
    <>
      <style>
        {`
          .login-root {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f7f8fa;
          }
          .login-box {
            position: relative;
            background: #fff;
            border-radius: 28px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
            width: 100%;
            max-width: 400px;
            padding: 40px 28px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            overflow: hidden;
          }
          .pattern-bg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,${drawnHatsPattern}");
            background-repeat: repeat;
            background-size: 160px 160px;
            z-index: 0;
            opacity: 0.5;
          }
          .login-content {
            position: relative;
            width: 100%;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .logo-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 14px;
          }
          .login-logo {
            width: 180px;
            max-width: 70vw;
            margin-bottom: 12px;
            margin-top: 8px;
            opacity: 1;
            border-radius: 12px;
            background: none;
            box-shadow: none;
          }
          .login-heading {
            margin: 16px 0 0 0;
            width: 100%;
            text-align: left;
          }
          .login-heading h3 {
            margin: 0;
          }
          .login-heading-desc {
            color: #888;
            font-size: 15px;
            margin-top: 2px;
          }
          .login-form {
            margin-top: 28px;
            width: 100%;
          }
          .login-form-group {
            margin-bottom: 18px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .login-form-group label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
          }
          .login-form-group input {
            width: 90%;
            font-size: 16px;
            padding: 8px 12px;
            border-radius: 7px;
            border: 1px solid #d1d5db;
            outline: none;
          }
          .login-form-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            width: 90%;
          }
          .login-form-row label {
            font-size: 14px;
          }
          .login-form-row .forgot-link {
            color: #ac0bf1ff;
            font-size: 14px;
            text-decoration: underline;
            cursor: pointer;
            background: none;
            border: none;
          }
          .login-btn {
            width: 100%;
            display: block;
            margin: 0 auto;
            padding: 12px;
            background: #ac0bf1ff;
            color: white;
            border: none;
            border-radius: 7px;
            font-size: 16px;
            cursor: pointer;
            text-align: center;
          }
          @media (max-width: 500px) {
            .login-box {
              border-radius: 12px;
              box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.07);
              padding: 24px 6px;
            }
            .login-logo {
              width: 120px;
            }
            .login-form-group input, .login-form-row {
              width: 98%;
            }
          }
        `}
      </style>
      <div className="login-root">
        <div className="login-box">
          <div className="pattern-bg" />
          <div className="login-content">
            <div className="logo-container">
              <img src={COLLEGE_LOGO_URL} alt="" className="login-logo" />
            </div>
            <div className="login-heading">
              <h3>Sign In</h3>
              <div className="login-heading-desc">
                The key to happiness is to sign in.
              </div>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-row">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    id="showPassword"
                    type="checkbox"
                    checked={showPassword}
                    onChange={e => setShowPassword(e.target.checked)}
                    style={{ marginRight: 8 }}
                  />
                  <label htmlFor="showPassword">
                    Show password
                  </label>
                </div>
                <a href="/forgot-password" className="forgot-link">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="login-btn">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}