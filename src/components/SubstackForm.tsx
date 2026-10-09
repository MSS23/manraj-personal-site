/** Substack's own sign-up embed: subscribers land in the publication, not on this site. */
export function SubstackForm({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`substack-form ${compact ? "is-compact" : ""}`}>
      {!compact && <p className="note-follow-label">The longer version, by email</p>}
      <iframe
        src="https://mannyssidhu.substack.com/embed"
        title="Subscribe to Manraj's Substack"
        loading="lazy"
        scrolling="no"
      />
    </div>
  );
}
