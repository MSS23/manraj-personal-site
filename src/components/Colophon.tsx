"use client";

import { useEffect, useState } from "react";

export function Colophon() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="colophon">
      <div className="colophon-inner">
        <p className="colophon-name">Manraj Sidhu</p>
        <ul className="colophon-links" aria-label="Elsewhere">
          <li>
            <a href="https://www.linkedin.com/in/manraj-sidhu/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/MSS23" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://mannyssidhu.substack.com/" target="_blank" rel="noopener noreferrer">
              Substack
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@manrajtalks" target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
          </li>
          <li>
            <a href="mailto:contact@manrajssidhu.com">Email</a>
          </li>
        </ul>
        <p className="colophon-meta">
          {year ? `© ${year} Manraj Sidhu.` : "© Manraj Sidhu."}
        </p>
      </div>
    </footer>
  );
}
