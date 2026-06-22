package org.abgehoben;

import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.dom.Style;

public class InfoLinkContainer extends Anchor {
    public InfoLinkContainer(String iconPath, String type, String href) {
        super(href, "");
        setTarget("_blank");
        addClassName("info-link-button");

        getStyle().setZIndex(2)
                .setPadding("4px")
                .set("backdrop-filter", "blur(8px)")
                .setBorderRadius("50px")
                .setBorder("2px #303335 solid")
                .setCursor("pointer")
                .set("pointer-events", "auto")
                .setTextDecoration("none")
                .setAlignItems(Style.AlignItems.CENTER)
                .setDisplay(Style.Display.FLEX);

        Image image = new Image(iconPath, type);
        image.getStyle().setColor("white")
                .setWidth("20px")
                .setHeight("20px")
                .setZIndex(2);
        add(image);

        Span infoName = new Span(type);
        infoName.addClassName("font");
        infoName.getStyle().setColor("white")
                .setFontSize("15px")
                .setFontWeight("bold")
                .setLineHeight("15px")
                .setMargin("0px 5px 0 5px");
        add(infoName);
    }
}
