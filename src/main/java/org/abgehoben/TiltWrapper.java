package org.abgehoben;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;

@Tag("tilt-wrapper")
@JsModule("./vanilla-tilt.js")
public class TiltWrapper extends Component implements HasComponents {

    public TiltWrapper(Component... components) {
        add(components);

        // Initialize the tilt effect by setting the data-tilt attribute to be honest, I don't know if this is even needed anymore.
        getElement().setAttribute("data-tilt", "");
        getElement().setAttribute("data-tilt-full-page-listening", "");

        getStyle().set("pointer-events", "none");
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);

        // Pass configuration options as a second argument to VanillaTilt.init().
        getElement().executeJs("VanillaTilt.init(this, { " +
                "max: 8, " +
                "speed: 1000, " +
                "reverse: true, " +
                "glare: false, " +
                "'max-glare': 0.8 " +
                "});");
    }
}
