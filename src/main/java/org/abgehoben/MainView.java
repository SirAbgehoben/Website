package org.abgehoben;

import com.vaadin.flow.component.dependency.JavaScript;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.Route;

@Route
@StyleSheet("https://fonts.googleapis.com/css2?family=Ubuntu+Mono")
public class MainView extends VerticalLayout {

    public MainView() {
        setSizeFull();
        setSpacing(false);
        getStyle().setBackgroundColor("#000000");

        ParticleBackground particleBackground = new ParticleBackground();
        particleBackground.setSizeFull();
        particleBackground.getStyle().setOverflow(Style.Overflow.HIDDEN).setPosition(Style.Position.ABSOLUTE)
                .setTop("0").setLeft("0");
        add(particleBackground);

        Image branding = new Image("icons/icon.svg", "My Alt Image");
        branding.getStyle().setColor("white")
                        .setWidth("50px")
                        .setHeight("50px")
                        .setMargin("10px")
                        .setZIndex(4)
                        .setPosition(Style.Position.ABSOLUTE);
        add(branding);

        ProfileContainer profileContainer = new ProfileContainer();

        HorizontalLayout infoLinkLayout = new HorizontalLayout();
        infoLinkLayout.setMargin(false);
        infoLinkLayout.setPadding(false);
        infoLinkLayout.setWrap(true);
        infoLinkLayout.setSpacing("4px");
        infoLinkLayout.setAlignItems(Alignment.CENTER);
        infoLinkLayout.getStyle().setMarginTop("10px");

        infoLinkLayout.add(new InfoLinkContainer("icons/github.svg", "GitHub", "https://github.com/SirAbgehoben"));
        infoLinkLayout.add(new InfoLinkContainer("icons/bluesky.svg", "Bluesky", "https://bsky.app/profile/sirabgehoben.bsky.social"));
        infoLinkLayout.add(new InfoLinkContainer("icons/discord.svg", "Discord", "https://Discord.abgehoben.org"));
        infoLinkLayout.add(new InfoLinkContainer("icons/email.svg", "Email", "mailto:admin@abgehoben.org"));

        VerticalLayout profileInfoLayout = new VerticalLayout(profileContainer, infoLinkLayout);
        profileInfoLayout.setAlignItems(Alignment.CENTER);
        profileInfoLayout.getStyle().setMarginTop("10px");
        profileInfoLayout.setMargin(false);
        profileInfoLayout.setSpacing(false);
        profileInfoLayout.setPadding(false);

        TiltWrapper tiltWrapper = new TiltWrapper(profileInfoLayout);
        setAlignSelf(Alignment.CENTER, tiltWrapper);
        add(tiltWrapper);

    }
}
