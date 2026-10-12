"use client";

import { useState } from "react";

/** Poster first, the TikTok or Instagram player only after a tap: keeps the page light and third-party-free until asked. */
export function TikTokEmbed({ src, name, cover, title, url }: { src: string; name: string; cover?: string; title: string; url: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="reel-frame">
      {on ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="eager"
        />
      ) : (
        <button type="button" className="reel-poster" onClick={() => setOn(true)} aria-label={`Play ${title}`}>
          {cover ? <img src={cover} alt="" decoding="async" /> : <span className="reel-poster-blank">M</span>}
          <span className="reel-play" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="reel-poster-label">Play on {name}</span>
        </button>
      )}
      <a className="reel-open" href={url} target="_blank" rel="noopener noreferrer">
        Open on {name} ↗
      </a>
    </div>
  );
}
