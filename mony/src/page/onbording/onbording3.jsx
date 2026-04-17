import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./onbording3.css";
import Navigate from "../../component/navigate";

function Dropdown({ placeholder, value, options, onChange, menuClassName = "" }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const isSelected = Boolean(value);

  return (
    <div className="join3-select" ref={wrapRef}>
      <button
        type="button"
        className={`join3-selectBtn ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={`join3-selectText ${
            isSelected ? "is-selected" : "is-placeholder"
          }`}
        >
          {isSelected ? value : placeholder}
        </span>
        <span className="join3-caret" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className={`join3-menu ${menuClassName}`} role="listbox">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`join3-item ${value === opt ? "is-active" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OnBording3() {
  const navigate = useNavigate();
  const location = useLocation();

  const routeName = location?.state?.name;
  const storedName =
    typeof window !== "undefined" ? localStorage.getItem("joinName") : "";
  const userName = (routeName || storedName || "회원").trim();

  const STORAGE_KEY = "onbording3Form";

  const initial3 = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, []);

  const [method, setMethod] = useState(initial3.method ?? null); // 'card' | 'account' | null

  const [cardCompany, setCardCompany] = useState(initial3.cardCompany ?? "");
  const [cardType, setCardType] = useState(initial3.cardType ?? "");

  const [bank, setBank] = useState(initial3.bank ?? "");
  const [accountType, setAccountType] = useState(initial3.accountType ?? "");

  // method 변경 시 반대쪽만 초기화 (현재 선택은 유지)
  useEffect(() => {
    if (method === "card") {
      setBank("");
      setAccountType("");
    } else if (method === "account") {
      setCardCompany("");
      setCardType("");
    }
  }, [method]);

  const cardCompanies = ["국민카드", "롯데카드", "삼성카드", "신한카드", "현대카드"];
  const cardTypes = ["신용카드", "체크카드"];

  const banks = [
    "국민은행",
    "기업은행",
    "농협은행",
    "신한은행",
    "우리은행",
    "카카오뱅크",
    "토스뱅크",
    "하나은행",
  ];
  const accountTypes = ["입출금", "적금", "예금", "CMA"];

  const isValid = useMemo(() => {
    if (method === "card") return Boolean(cardCompany) && Boolean(cardType);
    if (method === "account") return Boolean(bank) && Boolean(accountType);
    return false;
  }, [method, cardCompany, cardType, bank, accountType]);

  // ✅ 페이지 이동해도 값 유지
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ method, cardCompany, cardType, bank, accountType })
      );
    } catch {
      // ignore
    }
  }, [method, cardCompany, cardType, bank, accountType]);

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
      <section className="join1-card" aria-label="회원가입 3단계">
        <div className="join1-progressRow">
          <span className="join1-progressNow">03</span>
          <span className="join1-progressSlash">/</span>
          <span className="join1-progressTotal">03</span>
        </div>

        <div className="join1-titleBlock">
          <p className="join1-kicker">
            {userName} 님의 소비 데이터를 불러오기 위한 마지막 단계
          </p>
          <h1 className="join1-title">
            자동으로 지출을 분석하기 위해 카드 또는 계좌를 연결해주세요
          </h1>
        </div>

        <div className="join3-block">
          <p className="join3-label">서비스와 연결할 수단을 선택해주세요</p>
          <p className="join3-helper">카드와 계좌 중 한 가지만 선택할 수 있어요</p>

          <div className="join3-options" role="group" aria-label="연결 수단 선택">
            <button
              type="button"
              className={`join3-option ${method === "card" ? "is-on" : ""}`}
              onClick={() => setMethod((prev) => (prev === "card" ? null : "card"))}
            >
              <span className="join3-optionInner">
                <span className="join3-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 8.5C3 6.567 4.567 5 6.5 5H17.5C19.433 5 21 6.567 21 8.5V15.5C21 17.433 19.433 19 17.5 19H6.5C4.567 19 3 17.433 3 15.5V8.5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path d="M3 9.2H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M7 14.7H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="join3-optionText">카드</span>
              </span>
            </button>

            <button
              type="button"
              className={`join3-option ${method === "account" ? "is-on" : ""}`}
              onClick={() => setMethod((prev) => (prev === "account" ? null : "account"))}
            >
              <span className="join3-optionInner">
                <span className="join3-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.5 7C4.12 7 3 8.12 3 9.5V16.5C3 17.88 4.12 19 5.5 19H18.5C19.88 19 21 17.88 21 16.5V10.5C21 9.12 19.88 8 18.5 8H6.8C6.25 8 5.73 7.78 5.34 7.39C4.95 7 4.73 6.48 4.73 5.93C4.73 5.38 4.95 4.86 5.34 4.47C5.73 4.08 6.25 3.86 6.8 3.86H17"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M17 13.2H18.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="join3-optionText">계좌</span>
              </span>
            </button>
          </div>

          {method === "card" && (
            <div className="join3-sub">
              <div className="join3-field">
                <p className="join3-subTitle">카드사를 선택해 주세요</p>
                <p className="join3-subHelper">별도의 카드번호 입력 없이 카드사 선택으로 연결돼요</p>
                <Dropdown
                  placeholder="카드사 선택"
                  value={cardCompany}
                  options={cardCompanies}
                  onChange={setCardCompany}
                />
              </div>

              <div className="join3-field">
                <p className="join3-subTitle">카드 유형을 선택해 주세요</p>
                <Dropdown
                  placeholder="카드유형 선택"
                  value={cardType}
                  options={cardTypes}
                  onChange={setCardType}
                />
              </div>

              <ul className="join3-bullets">
                <li>모든 정보는 암호화되어 안전하게 처리돼요</li>
                <li>연결 후 자동으로 지출을 분류하고 분석해 드려요</li>
              </ul>
            </div>
          )}

          {method === "account" && (
            <div className="join3-sub">
              <div className="join3-field">
                <p className="join3-subTitle">금융기관을 선택해 주세요</p>
                <p className="join3-subHelper">별도의 계좌번호 입력 없이 금융기관 선택으로 연결돼요</p>
                <Dropdown
                  placeholder="금융기관 선택"
                  value={bank}
                  options={banks}
                  onChange={setBank}
                  menuClassName="join3-menu--bank"
                />
              </div>

              <div className="join3-field">
                <p className="join3-subTitle">계좌 유형을 선택해 주세요</p>
                <Dropdown
                  placeholder="계좌유형 선택"
                  value={accountType}
                  options={accountTypes}
                  onChange={setAccountType}
                />
              </div>

              <ul className="join3-bullets">
                <li>모든 정보는 암호화되어 안전하게 처리돼요</li>
                <li>연결 후 자동으로 지출을 분류하고 분석해 드려요</li>
              </ul>
            </div>
          )}

          <button
            type="button"
            disabled={!isValid}
            className={`join1-button ${isValid ? "is-enabled" : "is-disabled"}`}
            onClick={() => {
              if (!isValid) return;
              navigate("/onbording3", { state: { name: userName } });
              // 너가 원했던 라우팅이 /onbording3 -> 다음으로면 여기만 바꿔주면 돼!
              // navigate("/onbording3");
            }}
          >
            확인
          </button>
        </div>
      </section>

      <Navigate />
    </main>
  );
}