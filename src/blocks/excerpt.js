import './excerpt.scss';

export const Excerpt = ({ className, children }) => 
    <div className={`excerpt ${className || ''}`}>{children}</div>;

export const ConditionalExcerpt = ({ showExcerpt, children, value, className }) => showExcerpt ? <Excerpt className={className}>{value}</Excerpt> : children;