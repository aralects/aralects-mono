import { Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet";
import { capitalize, cn } from "~/lib/utils";
import {
  ColorModeSelect,
  Kbd,
  Separator,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SidebarTrigger,
} from "@repo/ui";
import { UserMenu } from "./UserMenu";

const AppContainer = ({
  title = "Admin | Aralects",
  description,
  children,
  className,
  ...rest
}: {
  title?: string;
  description?: string;
} & React.HTMLAttributes<HTMLElement>) => {
  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div
        className={cn(
          "grid h-full [grid-template-areas:'app-header''app-content''app-footer'] [grid-template-rows:min-content_1fr_min-content]",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </Fragment>
  );
};

const AppHeader = ({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 border-border/60 bg-muted/20 supports-[backdrop-filter]:bg-muted/20 border-b backdrop-blur [grid-area:app-header]",
        className,
      )}
      {...rest}
    >
      <div className="flex h-12 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-4 w-4" />
          <Kbd>
            ⌘ {capitalize(SIDEBAR_KEYBOARD_SHORTCUT)}
          </Kbd>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <nav className="ml-auto flex items-center gap-4">
          {children}
          <ColorModeSelect />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};

const AppContent = ({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className="[grid-area:app-content]" {...rest}>
      <div className={cn("", className)}>{children}</div>
    </div>
  );
};

const AppFooter = ({
  className,
  children,
  show,
  ...rest
}: { show?: boolean } & React.HTMLAttributes<HTMLElement>) => {
  return (
    <footer
      className={cn(
        "border-border/60 bg-muted/20 supports-[backdrop-filter]:bg-muted/20 flex items-center gap-x-4 border-t p-4 backdrop-blur transition-all",
        show
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-full opacity-0",
        className,
      )}
      {...rest}
    >
      {children}
    </footer>
  );
};

export { AppContainer, AppHeader, AppContent, AppFooter };
