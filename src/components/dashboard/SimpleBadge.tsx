interface SimpleBadgeProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}
export const SimpleBadge = ({ children, className, title }: SimpleBadgeProps) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${className}`}
    title={title}>
    {children}
  </span>
);
