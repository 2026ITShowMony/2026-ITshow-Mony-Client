import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./onbording1.css";
import Navigate from "../../component/navigate";

export default function OnBording1() {
  const navigate = useNavigate();
  const [name, setName] = useState(() => localStorage.getItem("joinName") ?? "");

  const isValid = useMemo(() => {
    const trimmed = name.trim();
    return trimmed.length > 0 && trimmed.length <= 20;
  }, [name]);

  useEffect(() => {
    localStorage.setItem("joinName", name);
  }, [name]);

  return (
    <main className="join1-page">
      {/* Top Icon */}
      <div className="join1-iconWrap" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="76"
          height="76"
          viewBox="0 0 76 76"
          fill="none"
          className="join1-icon"
        >
          <path
            d="M37.0073 0.923103C37.1023 -0.307632 38.9064 -0.307638 39.0014 0.923097L41.1056 28.1873C41.1685 29.0033 42.1316 29.4022 42.7532 28.8697L63.5198 11.0789C64.4572 10.2758 65.7329 11.5515 64.9298 12.489L47.139 33.2555C46.6065 33.8771 47.0054 34.8402 47.8215 34.9032L75.0856 37.0074C76.3164 37.1023 76.3164 38.9064 75.0856 39.0014L47.8215 41.1056C47.0054 41.1686 46.6065 42.1317 47.139 42.7532L64.9298 63.5198C65.7329 64.4573 64.4572 65.7329 63.5198 64.9299L42.7532 47.139C42.1316 46.6066 41.1685 47.0055 41.1056 47.8215L39.0014 75.0857C38.9064 76.3164 37.1023 76.3164 37.0073 75.0857L34.9031 47.8215C34.8401 47.0055 33.877 46.6066 33.2555 47.139L12.4889 64.9298C11.5515 65.7329 10.2758 64.4573 11.0789 63.5198L28.8697 42.7532C29.4022 42.1317 29.0032 41.1686 28.1872 41.1056L0.923042 39.0014C-0.307693 38.9064 -0.307699 37.1023 0.923036 37.0074L28.1872 34.9032C29.0032 34.8402 29.4022 33.8771 28.8697 33.2555L11.0789 12.489C10.2758 11.5515 11.5515 10.2758 12.4889 11.0789L33.2555 28.8697C33.877 29.4022 34.8401 29.0033 34.9031 28.1873L37.0073 0.923103Z"
            fill="#D9D9D9"
          />
        </svg>
      </div>

      {/* Card */}
      <section className="join1-card" aria-label="회원가입 1단계">
        <div className="join1-progressRow">
          <span className="join1-progressNow">01</span>
          <span className="join1-progressSlash">/</span>
          <span className="join1-progressTotal">03</span>
        </div>

        <div className="join1-titleBlock">
          <p className="join1-kicker">OOO과 함께할 첫 번째 단계</p>
          <h1 className="join1-title">회원님을 어떻게 불러 드릴까요?</h1>
        </div>

        <div className="join1-formBlock">
          <label htmlFor="join-name" className="join1-label">
            사용할 이름이나 닉네임을 알려주세요
          </label>

          <input
            id="join-name"
            name="join-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="최대 20자"
            maxLength={20}
            autoComplete="nickname"
            className="join1-input"
          />

          <p className="join1-helper">입력한 이름 · 닉네임으로 기록이 저장돼요</p>

          <button
            type="button"
            disabled={!isValid}
            className={`join1-button ${isValid ? "is-enabled" : "is-disabled"}`}
            onClick={() => {
              if (!isValid) return;
              const trimmed = name.trim();
              localStorage.setItem("joinName", trimmed);
              navigate("/onbording2", { state: { name: trimmed } });
            }}
          >
            확인
          </button>
        </div>
      </section>

      {/* Bottom Nav */}
      <Navigate />
    </main>
  );
}