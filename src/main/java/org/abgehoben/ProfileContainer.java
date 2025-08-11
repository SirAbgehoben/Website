package org.abgehoben;

import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

public class ProfileContainer extends HorizontalLayout {
    public ProfileContainer() {
        setSpacing(false);
        setMargin(false);
        setPadding(false);
        setAlignItems(Alignment.CENTER);

        getStyle().setZIndex(2)
                .setPadding("4px")
                .set("backdrop-filter", "blur(8px)")
                .setBorderRadius("50px")
                .setBorder("2px #303335 solid");
        Avatar user = new Avatar("SirAbgehoben");
        user.getStyle().setWidth("52px");
        user.getStyle().setHeight("52px");
        user.setImage("images/user.png");
        add(user);

        Span username = new Span("SirAbgehoben");
        username.addClassName("font");
        username.getStyle().setColor("white")
                .setFontSize("30px")
                .setFontWeight("bold")
                .setMargin("0px 10px 0 10px");
        add(username);
    }
}
