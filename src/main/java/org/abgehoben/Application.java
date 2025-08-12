package org.abgehoben;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.AppShellSettings;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@PWA(name = "Abgehoben",
        shortName = "Abgehoben",
        description = "My personal website. I'm passionate about coding in Java and self-hosting, which powers this site and my custom Minecraft network, AbgehobenNetwork. And I use Arch btw.",
        iconPath = "images/Abgehoben.svg",
        backgroundColor = "#000000")
@Theme("my-theme")
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void configurePage(AppShellSettings settings) {
        settings.setPageTitle("Abgehoben");
        settings.addMetaTag("author", "SirAbgehoben");
        settings.addFavIcon("icon", "icons/icon.svg", "192x192");
        settings.addLink("shortcut icon", "icons/favicon.ico");
    }
}
