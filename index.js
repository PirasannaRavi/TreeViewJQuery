var data = [{
	"id": "1",
	"name": "Root node",
	"children": [{
		"id": "2",
		"name": "Child node 1"
	}, {
		"id": "3",
		"name": "Child node 2"
	}, {
		"id": "4",
		"name": "Child node 3",
        "children": [{
            "id": "7",
            "name": "Child child 1"
        }, {
            "id": "8",
            "name": "Child child 2"
        }]
	}, {
		"id": "5",
		"name": "Child node 4"
	}, {
		"id": "6",
		"name": "Child node 5"
	}]
}];
$(document).ready(function () {
    var tree = $('#tree'),
        filter = $('#filter'),
        filtering = false,
        thread = null;
    
    tree.tree({
        data: data,
        dragAndDrop: false,
        autoOpen: true,
        useContextMenu: false,
        onCreateLi: function(node, $li) {
            var title = $li.find('.jqtree-title'),
                search = filter.val().toLowerCase(),
                value = title.text().toLowerCase();

            if(search !== '') {
                $li.hide();
                if(value.indexOf(search) > -1) {
                    $li.show();
                    var parent = node.parent;
                    while(typeof(parent.element) !== 'undefined') {
                        $(parent.element)
                            .show()
                            .addClass('jqtree-filtered');
                        parent = parent.parent;
                    }
                }
                if(!filtering) {
                    filtering = true;
                };
                if(!tree.hasClass('jqtree-filtering')) {
                    tree.addClass('jqtree-filtering');
                };
            } else {
                if(filtering) {
                    filtering = false;
                };
                if(tree.hasClass('jqtree-filtering')) {
                    tree.removeClass('jqtree-filtering');
                };
            };
            
        }
    });
    filter.keyup(function() {
		clearTimeout(thread);
		thread = setTimeout(function () {
			tree.tree('loadData', data);
		}, 50);
	});
});