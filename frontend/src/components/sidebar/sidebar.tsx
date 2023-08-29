import { useIsMobile } from '@/hooks/use-is-mobile';
import { useAtom } from 'jotai';
import {
  desktopSidebarAtom,
  mobileSidebarAtom,
} from '@/components/sidebar/atoms/sidebar-atom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconFileText } from '@tabler/icons-react';
import { SidebarSection } from '@/components/sidebar/sidebar-section';
import {
  navigationMenu,
  NavigationMenuType,
} from '@/components/sidebar/actions/sidebar-actions';
import ButtonWithIcon from '@/components/ui/button-with-icon';
import SidebarToggleButton from './sidebar-toggle-button';

export default function Sidebar() {
  const isMobile = useIsMobile();

  const [isSidebarOpen] = useAtom(
    isMobile ? mobileSidebarAtom : desktopSidebarAtom
  );

  return (
    <nav
      className={`${
        isSidebarOpen ? (isMobile ? 'w-full' : 'w-[270px]') : 'w-[0px]'
      } ${
        isMobile && isSidebarOpen
          ? 'fixed top-0 left-0 h-screen z-[99] bg-background'
          : ''
      } flex-grow-0 flex-shrink-0 overflow-hidden border-r duration-500 ease-in-out`}
    >
      {isMobile && (
        <>
          <SidebarToggleButton
            className={`absolute top-0 ${
              isSidebarOpen ? 'right-0' : 'left-0'
            } right-0 m-4`}
          />
          <div className="mt-[20px]"></div>
        </>
      )}

      <div className={`flex flex-col flex-shrink-0 gap-0.5 p-[10px]`}>
        <div className="h-full">
          <div className="mt-[20px]"></div>

          <SidebarSection className="pb-2 mb-4 select-none border-b">
            {navigationMenu.map((menu: NavigationMenuType, index: number) => (
              <ButtonWithIcon
                key={index}
                icon={menu.icon}
                variant={'ghost'}
                className="w-full flex flex-1 justify-start items-center"
              >
                <span className="text-ellipsis overflow-hidden">
                  {menu.label}
                </span>
              </ButtonWithIcon>
            ))}
          </SidebarSection>

          <ScrollArea className="h-[70vh]">
            <div className="space-y-1">
              <ButtonWithIcon
                variant="ghost"
                className="w-full justify-start"
                icon={<IconFileText size={16} />}
              >
                Welcome page
              </ButtonWithIcon>
            </div>
          </ScrollArea>
        </div>
      </div>
    </nav>
  );
}
