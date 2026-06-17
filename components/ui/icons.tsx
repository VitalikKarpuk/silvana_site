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

// Canton — from order-book onboarding/canton-wallet.svg (cube = Canton blockchain node)
export function CantonIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M16 8L8 12V20L16 24L24 20V12L16 8Z" />
      <path d="M16 8V24" />
      <path d="M8 12L24 20" />
      <path d="M24 12L8 20" />
    </svg>
  );
}

// Data Feeds — three ascending bars (activity / stream).
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
      <rect x="2" y="13" width="5" height="9" rx="1.5" />
      <rect x="9.5" y="7" width="5" height="15" rx="1.5" />
      <rect x="17" y="2" width="5" height="20" rx="1.5" />
    </svg>
  );
}

// Market Making — from order-book exchange.svg (two-directional bid/ask arrows).
export function MarketMakingIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 20 20"
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
      <path d="M7.50755 17.0832L3.32422 12.9082" />
      <path d="M7.50781 2.91602V17.0827" />
      <path d="M12.4922 2.91602L16.6755 7.09102" />
      <path d="M12.4922 17.0827V2.91602" />
    </svg>
  );
}

// Grid — from order-book settings/preferences.svg (3-level sliders = grid trading levels).
export function GridIcon({ size = 24, ...props }: Props) {
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
      <path d="M18 12.9987C18 13.4407 18.1756 13.8646 18.4882 14.1772C18.8007 14.4898 19.2246 14.6654 19.6667 14.6654C20.1087 14.6654 20.5326 14.4898 20.8452 14.1772C21.1577 13.8646 21.3333 13.4407 21.3333 12.9987C21.3333 12.5567 21.1577 12.1327 20.8452 11.8202C20.5326 11.5076 20.1087 11.332 19.6667 11.332C19.2246 11.332 18.8007 11.5076 18.4882 11.8202C18.1756 12.1327 18 12.5567 18 12.9987Z" />
      <path d="M11.3359 13H18.0026" />
      <path d="M21.3359 13H24.6693" />
      <path d="M13 17.9987C13 18.4407 13.1756 18.8646 13.4882 19.1772C13.8007 19.4898 14.2246 19.6654 14.6667 19.6654C15.1087 19.6654 15.5326 19.4898 15.8452 19.1772C16.1577 18.8646 16.3333 18.4407 16.3333 17.9987C16.3333 17.5567 16.1577 17.1327 15.8452 16.8202C15.5326 16.5076 15.1087 16.332 14.6667 16.332C14.2246 16.332 13.8007 16.5076 13.4882 16.8202C13.1756 17.1327 13 17.5567 13 17.9987Z" />
      <path d="M11.3359 18H13.0026" />
      <path d="M16.3359 18H24.6693" />
      <path d="M20.5 22.9987C20.5 23.4407 20.6756 23.8646 20.9882 24.1772C21.3007 24.4898 21.7246 24.6654 22.1667 24.6654C22.6087 24.6654 23.0326 24.4898 23.3452 24.1772C23.6577 23.8646 23.8333 23.4407 23.8333 22.9987C23.8333 22.5567 23.6577 22.1327 23.3452 21.8202C23.0326 21.5076 22.6087 21.332 22.1667 21.332C21.7246 21.332 21.3007 21.5076 20.9882 21.8202C20.6756 22.1327 20.5 22.5567 20.5 22.9987Z" />
      <path d="M11.3359 23H20.5026" />
      <path d="M23.8359 23H24.6693" />
    </svg>
  );
}

// Taker — single directional strike arrow.
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
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
      <path d="M5 6v12" />
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
