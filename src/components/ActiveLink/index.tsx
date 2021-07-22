import { useRouter } from 'next/router';
import Link , { LinkProps } from 'next/link';
import { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
    children: ReactElement,
    activeClassName: string;
}

export function ActiveLink({ 
    children, 
    activeClassName,
    ...otheProps
}: ActiveLinkProps) {

    const { asPath } = useRouter();
    const className = asPath === otheProps.href ? activeClassName : '';
;
    return (
        <Link { ...otheProps}>
            {cloneElement(children, {className})}
        </Link>
    );
    

}