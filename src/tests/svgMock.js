//eslint-disable-next-line  @typescript-eslint/no-require-imports
const React = require('react');

//eslint-disable-next-line
const SvgMock = React.forwardRef((props, ref) => <span ref={ref} {...props} />);

module.exports = SvgMock;
