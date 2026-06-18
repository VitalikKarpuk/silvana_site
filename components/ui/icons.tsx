import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

// Wallets — from order-book settings/wallets.svg
export function WalletsIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="8 8 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M23.8359 21.332V23.832C23.8359 24.053 23.7481 24.265 23.5919 24.4213C23.4356 24.5776 23.2236 24.6654 23.0026 24.6654H13.0026C12.5606 24.6654 12.1367 24.4898 11.8241 24.1772C11.5115 23.8646 11.3359 23.4407 11.3359 22.9987V12.9987C11.3359 12.5567 11.5115 12.1327 11.8241 11.8202C12.1367 11.5076 12.5606 11.332 13.0026 11.332H21.3359C21.557 11.332 21.7689 11.4198 21.9252 11.5761C22.0815 11.7324 22.1693 11.9444 22.1693 12.1654V14.6654M11.3359 12.9987C11.3359 13.4407 11.5115 13.8646 11.8241 14.1772C12.1367 14.4898 12.5606 14.6654 13.0026 14.6654H23.0026C23.2236 14.6654 23.4356 14.7532 23.5919 14.9094C23.7481 15.0657 23.8359 15.2777 23.8359 15.4987V17.9987" />
      <path d="M24.6641 18V21.3333H21.3307C20.8887 21.3333 20.4648 21.1577 20.1522 20.8452C19.8397 20.5326 19.6641 20.1087 19.6641 19.6667C19.6641 19.2246 19.8397 18.8007 20.1522 18.4882C20.4648 18.1756 20.8887 18 21.3307 18H24.6641Z" />
    </svg>
  );
}

// Canton — the Canton Coin (CC) token mark, recoloured into our turquoise
// palette (public/tokens/cc-teal.svg). Embedded via <image>; the two-tone
// teal is baked into the asset, so it does not follow currentColor.
export function CantonIcon({ size = 24, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...props}>
      <image href="/tokens/cc-teal.svg" x="0" y="0" width="24" height="24" />
    </svg>
  );
}

// Data Feeds — a stack of data (database cylinder of stacked layers).
export function DataFeedsIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <ellipse cx="12" cy="5" rx="7.5" ry="2.5" />
      <path d="M4.5 5v14c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5V5" />
      <path d="M4.5 9.7c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5" />
      <path d="M4.5 14.3c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5" />
    </svg>
  );
}

// Market Making — growing columns with a rising trend arrow (market growth).
export function MarketMakingIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M3.5 21h17" />
      <rect x="5" y="14" width="3.4" height="7" rx="1" />
      <rect x="10.3" y="10.5" width="3.4" height="10.5" rx="1" />
      <rect x="15.6" y="6.5" width="3.4" height="14.5" rx="1" />
      <path d="M5 12l5-3.5 3.5 1.5 6.5-6" />
      <path d="M16.5 3.5H20v3.5" />
    </svg>
  );
}

// Grid — a 2×2 grid of cells (grid-trading price levels).
export function GridIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

// Taker — a single person figure (the trader taking liquidity).
export function TakerIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

// Settlement — from order-book settings/verififcation.svg (user + checkmark = verified settlement).
export function SettlementIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="8 8 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M14.6641 13.8333C14.6641 14.7174 15.0153 15.5652 15.6404 16.1904C16.2655 16.8155 17.1133 17.1667 17.9974 17.1667C18.8815 17.1667 19.7293 16.8155 20.3544 16.1904C20.9795 15.5652 21.3307 14.7174 21.3307 13.8333C21.3307 12.9493 20.9795 12.1014 20.3544 11.4763C19.7293 10.8512 18.8815 10.5 17.9974 10.5C17.1133 10.5 16.2655 10.8512 15.6404 11.4763C15.0153 12.1014 14.6641 12.9493 14.6641 13.8333Z" />
      <path d="M13 25.5V23.8333C13 22.9493 13.3512 22.1014 13.9763 21.4763C14.6014 20.8512 15.4493 20.5 16.3333 20.5H19.6667" />
      <path d="M20.5 23.8346L22.1667 25.5013L25.5 22.168" />
    </svg>
  );
}

// Proving — shield with inner checkmark (cryptographic proof).
export function ProvingIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M12 2.5L3.5 6v6c0 4.5 3.7 8.7 8.5 9.5 4.8-.8 8.5-5 8.5-9.5V6L12 2.5z" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
