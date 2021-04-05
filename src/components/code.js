import { defaultProps } from 'prism-react-renderer';
import loadable from '@loadable/component';
import theme from 'prism-react-renderer/themes/oceanicNext';
import React, { useState } from 'react';
import styled from 'styled-components';

const copyToClipboard = str => {
    const clipboard = window.navigator.clipboard;
    /*
     * fallback to older browsers (including Safari)
     * if clipboard API not supported
     */
    if (!clipboard || typeof clipboard.writeText !== `function`) {
        const textarea = document.createElement(`textarea`);
        textarea.value = str;
        textarea.setAttribute(`readonly`, true);
        textarea.setAttribute(`contenteditable`, true);
        textarea.style.position = `absolute`;
        textarea.style.left = `-9999px`;
        document.body.appendChild(textarea);
        textarea.select();
        const range = document.createRange();
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand(`copy`);
        document.body.removeChild(textarea);

        return Promise.resolve(true);
    }

    return clipboard.writeText(str);
};

const LazyHighlight = loadable(async () => {
    const Module = await import(`prism-react-renderer`);
    const Highlight = Module.default;
    const { defaultProps } = Module;
    return props => <Highlight {...defaultProps} {...props} />;
});

const LazyLiveProvider = loadable(async () => {
    const Module = await import(`react-live`);
    const { LiveProvider, LiveEditor, LiveError, LivePreview } = Module;
    return props => (
        <LiveProvider {...props}>
            <LiveEditor data-name='live-editor' />
            <LiveError />
            <LivePreview data-name='live-preview' />
        </LiveProvider>
    );
});

const CopiedIcon = ({ fill = 'white' }) => (
    <svg width='15' height='19' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M5 3.33333H3.33333V5H5V3.33333ZM5 6.66667H3.33333V8.33333H5V6.66667ZM5 0C4.075 0 3.33333 0.75 3.33333 1.66667H5V0ZM8.33333 10H6.66667V11.6667H8.33333V10ZM13.3333 0V1.66667H15C15 0.75 14.25 0 13.3333 0ZM8.33333 0H6.66667V1.66667H8.33333V0ZM5 11.6667V10H3.33333C3.33333 10.9167 4.075 11.6667 5 11.6667ZM13.3333 8.33333H15V6.66667H13.3333V8.33333ZM13.3333 5H15V3.33333H13.3333V5ZM13.3333 11.6667C14.25 11.6667 15 10.9167 15 10H13.3333V11.6667ZM1.66667 3.33333H0V13.3333C0 14.25 0.741667 15 1.66667 15H11.6667V13.3333H1.66667V3.33333ZM10 1.66667H11.6667V0H10V1.66667ZM10 11.6667H11.6667V10H10V11.6667Z'
            fill={fill}
        />
    </svg>
);

const CopyIcon = ({ fill = '#08080B', ...props }) => (
    <svg
        width='15'
        height='19'
        viewBox='0 0 15 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <path
            d='M11.0475 0.905273H1.67197C0.812542 0.905273 0.109375 1.60844 0.109375 2.46787V13.406H1.67197V2.46787H11.0475V0.905273ZM13.3914 4.03046H4.79716C3.93773 4.03046 3.23456 4.73363 3.23456 5.59306V16.5312C3.23456 17.3906 3.93773 18.0938 4.79716 18.0938H13.3914C14.2509 18.0938 14.954 17.3906 14.954 16.5312V5.59306C14.954 4.73363 14.2509 4.03046 13.3914 4.03046ZM13.3914 16.5312H4.79716V5.59306H13.3914V16.5312Z'
            fill={fill}
        />
    </svg>
);

const CopyButton = styled.div`
  position: absolute;
  right: 2px;
  top: 24px;
  padding: 8px 12px 7px;
  border-radius: 0px;
  color: #7c7d80;
  transition: background 0.3s ease;
  @media (max-width: 767px) {
    display: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }
  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -2%;
    top: -2%;
    width: 104%;
    height: 104%;
    border: 2px solid #6166dc;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.01);
  }
`;

const Copy = ({ toCopy }) => {
    const [hasCopied, setHasCopied] = useState(false);

    function copyToClipboardOnClick() {
        if (hasCopied) return;

        copyToClipboard(toCopy);
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }

    return (
        <CopyButton onClick={copyToClipboardOnClick} data-a11y='false'>
            {hasCopied ? (
                <>
                    Copied <CopiedIcon fill='#6f7177' />
                </>
            ) : (
                <>
                    <CopyIcon fill='#6f7177' />
                </>
            )}
        </CopyButton>
    );
};

function getParams(className = ``) {
    const [lang = ``, params = ``] = className.split(`:`);

    return [
        // @ts-ignore
        lang
            .split(`language-`)
            .pop()
            .split(`{`)
            .shift()
    ].concat(
        // @ts-ignore
        params.split(`|`).reduce((merged, param) => {
            const [key, value] = param.split(`=`);
            // @ts-ignore
            merged[key] = value;
            return merged;
        }, {})
    );
}

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = meta => {
    if (!RE.test(meta)) {
        return () => false;
    }
    const lineNumbers = RE.exec(meta)[1]
        .split(`,`)
        .map(v => v.split(`-`).map(x => parseInt(x, 10)));
    return index => {
        const lineNumber = index + 1;
        const inRange = lineNumbers.some(([start, end]) =>
            end ? lineNumber >= start && lineNumber <= end : lineNumber === start
        );
        return inRange;
    };
};

const Code = ({ codeString, className: blockClassName, metastring = ``, ...props }) => {
    if (props['react-live']) {
        return <LazyLiveProvider code={codeString} noInline={true} theme={theme} />;
    }

    const [language, { title = ``, showLines = `true` }] = getParams(blockClassName);
    const shouldHighlightLine = calculateLinesToHighlight(metastring);

    return (
        <LazyHighlight {...defaultProps} code={codeString} language={language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <React.Fragment>
                    {title && (
                        <div className='code-title'>
                            <div>{title}</div>
                        </div>
                    )}
                    <div className='gatsby-highlight' data-language={language}>
                        <pre className={className} style={style}>
                            <Copy toCopy={codeString} />
                            {tokens.map((line, i) => {
                                const lineProps = getLineProps({ line, key: i });
                                if (shouldHighlightLine(i)) {
                                    lineProps.className = `${lineProps.className} line-highlight`;
                                }
                                return (
                                    <div {...lineProps}>
                                        {showLines === `true` &&
                                            <span className="line-number-style">{i + 1}</span>
                                        }
                                        {line.map((token, key) => (
                                            <span {...getTokenProps({ token, key })} />
                                        ))}
                                    </div>
                                );
                            })}
                        </pre>
                    </div>
                </React.Fragment>
            )}
        </LazyHighlight>
    );
};

export default Code;
