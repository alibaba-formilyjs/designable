import type { MenuProps as RcMenuProps, MenuRef } from 'rc-menu';
import { ItemGroup } from 'rc-menu';
import * as React from 'react';
import type { ItemType } from './hooks/useItems';
import { MenuTheme } from './MenuContext';
import Item, { MenuItemProps } from './MenuItem';
import SubMenu, { SubMenuProps } from './SubMenu';
export { MenuItemGroupProps } from 'rc-menu';
export { MenuDividerProps } from './MenuDivider';
export { MenuTheme, SubMenuProps, MenuItemProps };
export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
export interface MenuProps extends Omit<RcMenuProps, 'items'> {
    theme?: MenuTheme;
    inlineIndent?: number;
    items?: ItemType[];
}
declare class Menu extends React.Component<MenuProps, {}> {
    static Divider: React.FC<import("./MenuDivider").MenuDividerProps>;
    static Item: typeof Item;
    static SubMenu: typeof SubMenu;
    static ItemGroup: typeof ItemGroup;
    menu: MenuRef | null;
    focus: (options?: FocusOptions) => void;
    render(): React.JSX.Element;
}
export default Menu;
