import InternalLayout, { Content, Footer, Header } from './layout';
import Sider, { SiderContext } from './Sider';
var Layout = InternalLayout;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;
Layout._InternalSiderContext = SiderContext;
export default Layout;