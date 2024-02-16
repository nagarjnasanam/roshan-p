import React from 'react'


interface FlexProps {
    alignItems?: string | undefined ;
    children?: React.ReactNode;
    className?: string | undefined ;
    flex?: string;
    flexBasis?: string | undefined ;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    flexGrow?: string | undefined;
    flexShrink?: string | undefined ;
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: string | undefined;
    height?: string | undefined ;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    margin?: string | undefined;
    maxWidth?: string | undefined ;
    padding?: string | undefined ;
    style?: React.CSSProperties ;
    width?: string | undefined ;
}
function Flex(props: FlexProps): JSX.Element {
    const {
        flex,
        justifyContent,
        flexDirection,
        flexGrow,
        flexBasis,
        flexShrink,
        flexWrap,
        alignItems,
        margin,
        padding,
        width,
        height,
        maxWidth,
        style = {},
        className,
        children,
        gap
    } = props;

    return (
        <div
            className = { className }
            style = {{
                display: 'flex',
                justifyContent: justifyContent ?? 'flex-start',
                flexDirection: flexDirection ?? 'row',
                flexGrow: flexGrow ?? 0,
                flexBasis: flexBasis ?? 'auto',
                flexShrink: flexShrink ?? 1,
                flexWrap: flexWrap ?? 'nowrap',
                flex: flex ?? '0 1 auto',
                alignItems: alignItems ?? 'stretch',
                margin: margin ?? 'auto',
                padding: padding ?? '0',
                width: width ?? 'auto',
                height: height ?? 'auto',
                maxWidth: maxWidth ?? 'none',
                gap: gap ?? 1,
                ...style
            }}>
            {children || ''}
        </div>
    );
}


export default Flex;
