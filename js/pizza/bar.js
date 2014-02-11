$.extend(Pizza, {
  bar: function (legend) {
    var settings = legend.data('settings'),
        svg = this.svg(legend, settings),
        data = legend.data('graph-data'),
        current_offset = 0,
        container = $(this.identifier(legend)),
        base_width = container.width(),
        base_height = $(this.identifier(legend)).width() - 4,
        max = min = 0,
        total = total_tick_height = 0,
        interval = (base_width - (data.length * settings.bar_spacer)) / data.length;

    for (var i = 0; i < data.length; i++) {
      if (max < data[i].value) max = data[i].value;
      if (min > data[i].value) min = data[i].value;
      total += data[i].value;
    }

    var existing_group = $('g', svg.node);

    if (existing_group.length > 0) {
      return [legend, svg.node]
      var g = Snap(existing_group[0]);
    } else {
      var g = svg.g();
    }

    if (settings.show_grid) {
      this.assemble_grid(g, svg, min, max, base_height, settings);
    }

    svg.node.setAttribute('preserveAspectRatio', 'none');

    g.node.setAttribute('transform', 'translate(0, ' + (base_height - 2) +') scale(1, -1)');

    for (var i = 0; i < data.length; i++) {
      var y = (base_height - 5) * (data[i].value / max),
          rect = svg.rect();

      if (current_offset === 0) {
        var new_offset = current_offset;
      } else {
        var new_offset = current_offset + settings.bar_spacer;
      }

      rect.node.setAttribute('x', new_offset + 5);
      rect.node.setAttribute('y', 0);
      rect.node.setAttribute('width', interval);
      rect.node.setAttribute('height', y);
      rect.node.setAttribute('fill', data[i].color);
      rect.node.setAttribute('stroke', '#222222');
      rect.node.setAttribute('stroke-width', 2);

      current_offset = new_offset + interval;

      g.add(rect);
    }

    return [legend, svg.node];
  },

  assemble_grid : function (g, svg, min, max, height, settings) {
    var ticks = this.ticks(min, max, settings.bar_intervals),
        ticks_length = ticks.length;

    for (var i = 0; i < ticks_length; i++) {
      var line_height = total_tick_height + (height/ticks_length);
      var line = svg.line(0, line_height, 10000, line_height);
      line.node.setAttribute("stroke", "gray");
      line.node.setAttribute("stroke-width", "1");
      g.add(line);
      total_tick_height = line_height;
    }

  }
});