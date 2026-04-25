export default function FlowArrow({ color }: { color: string }) {
  return (
    <div className="flex items-center px-2 shrink-0">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <line x1="0" y1="8" x2="26" y2="8" stroke={color} strokeWidth="1.5"
          strokeDasharray="4 2" opacity="0.6">
          <animate attributeName="stroke-dashoffset" from="0" to="-12"
            dur="1.2s" repeatCount="indefinite" />
        </line>
        <path d="M24 4 L30 8 L24 12" stroke={color} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
      </svg>
    </div>
  );
}
