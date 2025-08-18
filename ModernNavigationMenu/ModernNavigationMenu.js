define(["qlik", "text!./template.html", 'text!./style.css'],
    function (qlik, template, css) {
        $('<style>').html(css).appendTo('head');
        
        return {
            template: template,
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    settings: {
                        uses: "settings",
                        items: {
                            // Logo Settings
                            logoSection: {
                                type: "items",
                                label: "Logo Settings",
                                items: {
                                    logoUrl: {
                                        type: "string",
                                        ref: "logoUrl",
                                        label: "Logo URL (PNG/SVG)",
                                        expression: "optional",
                                        defaultValue: ""
                                    },
                                    companyName: {
                                        type: "string",
                                        ref: "companyName",
                                        label: "Company Name",
                                        expression: "optional",
                                        defaultValue: "Doclines"
                                    }
                                }
                            },
                            // Search Settings
                            searchSection: {
                                type: "items",
                                label: "Search Settings",
                                items: {
                                    enableSearch: {
                                        type: "boolean",
                                        label: "Enable Search",
                                        ref: "enableSearch",
                                        defaultValue: true
                                    },
                                    searchPlaceholder: {
                                        type: "string",
                                        ref: "searchPlaceholder",
                                        label: "Search Placeholder",
                                        expression: "optional",
                                        defaultValue: "Search",
                                        show: function(data) {
                                            return data.enableSearch;
                                        }
                                    }
                                }
                            },
                            // Main Menu Items
                            mainMenuItems: {
                                type: "array",
                                ref: "mainMenuItems",
                                label: "Main Menu Items",
                                itemTitleRef: "label",
                                allowAdd: true,
                                allowRemove: true,
                                addTranslation: "Add Menu Item",
                                items: {
                                    label: {
                                        type: "string",
                                        ref: "label",
                                        label: "Label",
                                        expression: "optional"
                                    },
                                    iconUrl: {
                                        type: "string",
                                        ref: "iconUrl",
                                        label: "Icon URL or SVG Code",
                                        expression: "optional",
                                        defaultValue: ""
                                    },
                                    target: {
                                        type: "string",
                                        ref: "target",
                                        label: "Sheet ID (leave empty if has submenu)",
                                        expression: "optional"
                                    },
                                    hasSubmenu: {
                                        type: "boolean",
                                        label: "Has Submenu",
                                        ref: "hasSubmenu",
                                        defaultValue: false
                                    },
                                    submenuItems: {
                                        type: "array",
                                        ref: "submenuItems",
                                        label: "Submenu Items",
                                        itemTitleRef: "label",
                                        allowAdd: true,
                                        allowRemove: true,
                                        show: function(data) {
                                            return data.hasSubmenu;
                                        },
                                        items: {
                                            label: {
                                                type: "string",
                                                ref: "label",
                                                label: "Submenu Label",
                                                expression: "optional"
                                            },
                                            iconUrl: {
                                                type: "string",
                                                ref: "iconUrl",
                                                label: "Icon URL or SVG Code",
                                                expression: "optional",
                                                defaultValue: ""
                                            },
                                            target: {
                                                type: "string",
                                                ref: "target",
                                                label: "Sheet ID or URL",
                                                expression: "optional"
                                            },
                                            badgeText: {
                                                type: "string",
                                                ref: "badgeText",
                                                label: "Badge Text (optional)",
                                                expression: "optional",
                                                defaultValue: ""
                                            },
                                            badgeColor: {
                                                type: "string",
                                                ref: "badgeColor",
                                                label: "Badge Color",
                                                component: "dropdown",
                                                defaultValue: "green",
                                                show: function(data) {
                                                    return data.badgeText && data.badgeText.length > 0;
                                                },
                                                options: [
                                                    { value: "green", label: "Green" },
                                                    { value: "red", label: "Red" },
                                                    { value: "blue", label: "Blue" },
                                                    { value: "orange", label: "Orange" },
                                                    { value: "gray", label: "Gray" }
                                                ]
                                            },
                                            clearFilters: {
                                                type: "boolean",
                                                label: "Clear filters on navigation",
                                                ref: "clearFilters",
                                                defaultValue: false
                                            }
                                        }
                                    },
                                    clearFilters: {
                                        type: "boolean",
                                        label: "Clear filters on navigation",
                                        ref: "clearFilters",
                                        defaultValue: false,
                                        show: function(data) {
                                            return !data.hasSubmenu;
                                        }
                                    },
                                    badgeText: {
                                        type: "string",
                                        ref: "badgeText",
                                        label: "Badge Text (optional)",
                                        expression: "optional",
                                        defaultValue: ""
                                    },
                                    badgeColor: {
                                        type: "string",
                                        ref: "badgeColor",
                                        label: "Badge Color",
                                        component: "dropdown",
                                        defaultValue: "red",
                                        show: function(data) {
                                            return data.badgeText && data.badgeText.length > 0;
                                        },
                                        options: [
                                            { value: "green", label: "Green" },
                                            { value: "red", label: "Red" },
                                            { value: "blue", label: "Blue" },
                                            { value: "orange", label: "Orange" },
                                            { value: "gray", label: "Gray" }
                                        ]
                                    }
                                }
                            },
                            // Bottom Menu Items
                            bottomMenuItems: {
                                type: "array",
                                ref: "bottomMenuItems",
                                label: "Bottom Menu Items",
                                itemTitleRef: "label",
                                allowAdd: true,
                                allowRemove: true,
                                addTranslation: "Add Bottom Item",
                                items: {
                                    label: {
                                        type: "string",
                                        ref: "label",
                                        label: "Label",
                                        expression: "optional"
                                    },
                                    iconUrl: {
                                        type: "string",
                                        ref: "iconUrl",
                                        label: "Icon URL or SVG Code",
                                        expression: "optional",
                                        defaultValue: ""
                                    },
                                    target: {
                                        type: "string",
                                        ref: "target",
                                        label: "URL or Sheet ID",
                                        expression: "optional"
                                    }
                                }
                            },
                            // Behavior Settings
                            behaviorSection: {
                                type: "items",
                                label: "Behavior Settings",
                                items: {
                                    startCollapsed: {
                                        type: "boolean",
                                        label: "Start collapsed",
                                        ref: "startCollapsed",
                                        defaultValue: false
                                    },
                                    hideInEditMode: {
                                        type: "boolean",
                                        label: "Hide menu in edit mode",
                                        ref: "hideInEditMode",
                                        defaultValue: true
                                    },
                                    enableTooltips: {
                                        type: "boolean",
                                        label: "Enable tooltips in collapsed mode",
                                        ref: "enableTooltips",
                                        defaultValue: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            support: {
                snapshot: true,
                export: true,
                exportData: false
            },
            paint: function ($element, layout) {
                var instanceId = layout.qInfo.qId;
                
                // Apply settings to the global sidebar
                if (window.modernMenuSettings) {
                    window.modernMenuSettings.layout = layout;
                    window.modernMenuSettings.instanceId = instanceId;
                }
                
                // Hide/show based on edit mode
                if (layout.hideInEditMode && qlik.navigation.getMode() === "edit") {
                    $('#modern-nav-global').hide();
                    $('body').removeClass('modern-menu-active');
                    $('.qv-panel-sheet').removeClass('modern-menu-shifted modern-menu-shifted-collapsed');
                } else {
                    $('#modern-nav-global').show();
                    $('body').addClass('modern-menu-active');
                    // Restore the correct shift based on collapsed state
                    if (window.modernMenuState && window.modernMenuState.isCollapsed) {
                        $('.qv-panel-sheet').removeClass('modern-menu-shifted').addClass('modern-menu-shifted-collapsed');
                    } else {
                        $('.qv-panel-sheet').removeClass('modern-menu-shifted-collapsed').addClass('modern-menu-shifted');
                    }
                }
                
                // Only update active menu item if not already set by navigation
                if (!window.modernMenuState || !window.modernMenuState.navigating) {
                    var currentSheetId = qlik.navigation.getCurrentSheetId().sheetId;
                    $('#modern-nav-global .menu-item').removeClass('active');
                    $('#modern-nav-global .menu-item[data-sheet-id="' + currentSheetId + '"]').addClass('active');
                    $('#modern-nav-global .submenu-item[data-sheet-id="' + currentSheetId + '"]').addClass('active');
                }
                
                // Reset navigation flag
                if (window.modernMenuState) {
                    window.modernMenuState.navigating = false;
                }
                
                return qlik.Promise.resolve();
            },
            controller: ['$scope', '$element', '$compile', function ($scope, $element, $compile) {
                var app = qlik.currApp();
                var instanceId = $scope.layout.qInfo.qId;
                
                // Store settings globally
                window.modernMenuSettings = window.modernMenuSettings || {};
                window.modernMenuSettings.layout = $scope.layout;
                window.modernMenuSettings.instanceId = instanceId;
                window.modernMenuSettings.scope = $scope;
                
                // Function to convert SVG to data URL
                $scope.svgToDataUrl = function(svgString) {
                    if (!svgString) return null;
                    
                    // Clean the SVG string
                    var cleanSvg = svgString.trim();
                    
                    // If it's already a data URL, return as is
                    if (cleanSvg.indexOf('data:') === 0) {
                        return cleanSvg;
                    }
                    
                    // If it's a regular URL, return as is
                    if (cleanSvg.indexOf('http') === 0) {
                        return cleanSvg;
                    }
                    
                    // Remove any quotes around the SVG
                    if ((cleanSvg.charAt(0) === "'" && cleanSvg.charAt(cleanSvg.length - 1) === "'") || 
                        (cleanSvg.charAt(0) === '"' && cleanSvg.charAt(cleanSvg.length - 1) === '"')) {
                        cleanSvg = cleanSvg.slice(1, -1);
                    }
                    
                    // Encode the SVG for data URL
                    var encodedSvg = encodeURIComponent(cleanSvg);
                    return 'data:image/svg+xml,' + encodedSvg;
                };
                
                // Default logo with exact Doclines style
                $scope.getDefaultLogo = function() {
                    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%2310b981'/%3E%3Ccircle cx='35' cy='35' r='6' fill='white'/%3E%3Ccircle cx='65' cy='35' r='6' fill='white'/%3E%3C/svg%3E";
                };
                
                // Store sidebar state globally
                window.modernMenuState = window.modernMenuState || {
                    isCollapsed: $scope.layout.startCollapsed || false,
                    navigating: false,
                    expandedMenus: []
                };
                
                // Helper function to check if menu is expanded
                function isMenuExpanded(menuIndex) {
                    var menuKey = 'menu_' + menuIndex;
                    for (var i = 0; i < window.modernMenuState.expandedMenus.length; i++) {
                        if (window.modernMenuState.expandedMenus[i] === menuKey) {
                            return true;
                        }
                    }
                    return false;
                }
                
                // Helper function to add expanded menu
                function addExpandedMenu(menuIndex) {
                    var menuKey = 'menu_' + menuIndex;
                    if (!isMenuExpanded(menuIndex)) {
                        window.modernMenuState.expandedMenus.push(menuKey);
                    }
                }
                
                // Helper function to remove expanded menu
                function removeExpandedMenu(menuIndex) {
                    var menuKey = 'menu_' + menuIndex;
                    var newExpandedMenus = [];
                    for (var i = 0; i < window.modernMenuState.expandedMenus.length; i++) {
                        if (window.modernMenuState.expandedMenus[i] !== menuKey) {
                            newExpandedMenus.push(window.modernMenuState.expandedMenus[i]);
                        }
                    }
                    window.modernMenuState.expandedMenus = newExpandedMenus;
                }
                
                // Navigate function
                $scope.navigateGlobal = function(item) {
                    if (!item || !item.target) return;
                    
                    // Check if it's a URL
                    if (item.target.indexOf('http://') === 0 || item.target.indexOf('https://') === 0) {
                        window.open(item.target, '_blank');
                    } else {
                        // Set navigation flag to prevent paint from resetting active state
                        window.modernMenuState.navigating = true;
                        
                        // It's a sheet ID - update active state immediately
                        $('#modern-nav-global .menu-item, #modern-nav-global .submenu-item').removeClass('active');
                        $('#modern-nav-global .menu-item[data-sheet-id="' + item.target + '"], #modern-nav-global .submenu-item[data-sheet-id="' + item.target + '"]').addClass('active');
                        
                        // Navigate to sheet
                        qlik.navigation.gotoSheet(item.target);
                        
                        if (item.clearFilters) {
                            app.clearAll();
                        }
                    }
                };
                
                // Toggle submenu
                $scope.toggleSubmenu = function(menuIndex) {
                    if (isMenuExpanded(menuIndex)) {
                        removeExpandedMenu(menuIndex);
                    } else {
                        addExpandedMenu(menuIndex);
                    }
                    updateMenuItems();
                    
                    // Update the expand icon text
                    var expandIcon = $('#modern-nav-global .expand-icon[data-menu-index="' + menuIndex + '"]');
                    if (expandIcon.length > 0) {
                        expandIcon.text(isMenuExpanded(menuIndex) ? '−' : '+');
                    }
                };
                
                // Toggle sidebar function
                $scope.toggleGlobalSidebar = function() {
                    var sidebar = $('#modern-nav-global');
                    var sheet = $('.qv-panel-sheet');
                    
                    // Toggle state
                    window.modernMenuState.isCollapsed = !window.modernMenuState.isCollapsed;
                    
                    if (window.modernMenuState.isCollapsed) {
                        sidebar.addClass('collapsed');
                        sheet.removeClass('modern-menu-shifted').addClass('modern-menu-shifted-collapsed');
                        // Collapse all expanded menus
                        window.modernMenuState.expandedMenus = [];
                        updateMenuItems();
                    } else {
                        sidebar.removeClass('collapsed');
                        sheet.removeClass('modern-menu-shifted-collapsed').addClass('modern-menu-shifted');
                    }
                };
                
                // Search functionality
                $scope.searchMenu = function(query) {
                    if (!query || query.trim() === '') {
                        $('#modern-nav-global .menu-item, #modern-nav-global .submenu-item').show();
                        $('#modern-nav-global .submenu').show();
                        return;
                    }
                    
                    query = query.toLowerCase().trim();
                    
                    // Hide all items first
                    $('#modern-nav-global .menu-item').hide();
                    $('#modern-nav-global .submenu-item').hide();
                    $('#modern-nav-global .submenu').hide();
                    
                    // Show matching items
                    $('#modern-nav-global .menu-item, #modern-nav-global .submenu-item').each(function() {
                        var label = $(this).data('label');
                        if (label && label.toLowerCase().indexOf(query) !== -1) {
                            $(this).show();
                            // If it's a submenu item, show its parent submenu
                            if ($(this).hasClass('submenu-item')) {
                                $(this).closest('.submenu').show();
                            }
                        }
                    });
                };
                
                // Show submenu tooltip in collapsed mode
                function showSubmenuTooltip(expandButton, menuIndex) {
                    // Remove any existing submenu tooltips
                    $('.submenu-tooltip').remove();
                    
                    var menuItem = $scope.layout.mainMenuItems[menuIndex];
                    if (!menuItem || !menuItem.submenuItems) return;
                    
                    var buttonRect = expandButton[0].getBoundingClientRect();
                    var submenuHtml = '<div class="submenu-tooltip" style="position: fixed; left: 88px; top: ' + buttonRect.top + 'px; z-index: 10000;">';
                    submenuHtml += '<div class="submenu-tooltip-content">';
                    
                    for (var i = 0; i < menuItem.submenuItems.length; i++) {
                        var subItem = menuItem.submenuItems[i];
                        submenuHtml += '<a class="submenu-tooltip-item" ';
                        submenuHtml += 'data-sheet-id="' + (subItem.target || '') + '" ';
                        submenuHtml += 'data-label="' + subItem.label + '" ';
                        submenuHtml += 'data-clear-filters="' + (subItem.clearFilters || false) + '">';
                        submenuHtml += getIconHtml(subItem.iconUrl, subItem.label);
                        submenuHtml += '<span class="menu-label">' + subItem.label + '</span>';
                        submenuHtml += getBadgeHtml(subItem.badgeText, subItem.badgeColor);
                        submenuHtml += '</a>';
                    }
                    
                    submenuHtml += '</div></div>';
                    
                    $('body').append(submenuHtml);
                    
                    // Bind click events for tooltip items
                    $('.submenu-tooltip-item').on('click', function() {
                        var target = $(this).data('sheet-id');
                        var clearFilters = $(this).data('clear-filters') === true || $(this).data('clear-filters') === 'true';
                        
                        for (var i = 0; i < menuItem.submenuItems.length; i++) {
                            if (menuItem.submenuItems[i].target === target) {
                                var item = menuItem.submenuItems[i];
                                if (clearFilters) {
                                    item.clearFilters = true;
                                }
                                $scope.navigateGlobal(item);
                                break;
                            }
                        }
                        $('.submenu-tooltip').remove();
                    });
                    
                    // Remove tooltip when clicking outside
                    $(document).on('click.submenu-tooltip', function(e) {
                        var $target = $(e.target);
                        if (!$target.closest('.submenu-tooltip').length && !$target.closest('.expand-icon').length) {
                            $('.submenu-tooltip').remove();
                            $(document).off('click.submenu-tooltip');
                        }
                    });
                }
                
                // Update menu items without recreating entire sidebar
                function updateMenuItems() {
                    var mainContainer = $('#main-menu-container');
                    var bottomContainer = $('#bottom-menu-container');
                    
                    // Only update if containers exist
                    if (mainContainer.length === 0) return;
                    
                    // Function to handle icon URL (including SVG) - только outline стили
                    function getIconHtml(iconUrl, label) {
                        if (!iconUrl) {
                            // Default outline icons
                            var defaultIcons = {
                                'Dashboard': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14H8V5z"/%3E%3C/svg%3E',
                                'Calendar': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/%3E%3C/svg%3E',
                                'Documents': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/%3E%3C/svg%3E',
                                'Inbox': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/%3E%3C/svg%3E',
                                'Incoming': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/%3E%3C/svg%3E',
                                'Export': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/%3E%3C/svg%3E',
                                'Statistics': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/%3E%3C/svg%3E',
                                'Chat': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/%3E%3C/svg%3E',
                                'Info': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/%3E%3C/svg%3E',
                                'Request': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/%3E%3C/svg%3E'
                            };
                            iconUrl = defaultIcons[label] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"%3E%3Ccircle cx="12" cy="12" r="10"/%3E%3C/svg%3E';
                        } else {
                            // Convert SVG string to data URL if needed
                            var processedIconUrl = $scope.svgToDataUrl(iconUrl) || iconUrl;
                            
                            // Ensure SVG uses outline style
                            if (processedIconUrl.indexOf('data:image/svg+xml') !== -1) {
                                processedIconUrl = processedIconUrl.replace(/fill="[^"]*"/g, 'fill="none"');
                                processedIconUrl = processedIconUrl.replace(/fill:[^;]*;/g, 'fill:none;');
                                if (processedIconUrl.indexOf('stroke=') === -1) {
                                    processedIconUrl = processedIconUrl.replace('<svg', '<svg stroke="currentColor"');
                                }
                                if (processedIconUrl.indexOf('stroke-width=') === -1) {
                                    processedIconUrl = processedIconUrl.replace('<svg', '<svg stroke-width="2"');
                                }
                            }
                            iconUrl = processedIconUrl;
                        }
                        
                        return '<img src="' + iconUrl + '" class="menu-icon" style="fill: none !important; stroke: currentColor !important;" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'inline-flex\'"><span class="menu-icon-default" style="display:none">○</span>';
                    }
                    
                    // Function to create badge HTML
                    function getBadgeHtml(badgeText, badgeColor) {
                        if (!badgeText) return '';
                        badgeColor = badgeColor || 'red';
                        return '<span class="menu-badge badge-' + badgeColor + '">' + badgeText + '</span>';
                    }
                    
                    // Clear and update main menu items
                    mainContainer.empty();
                    if ($scope.layout.mainMenuItems && $scope.layout.mainMenuItems.length > 0) {
                        for (var i = 0; i < $scope.layout.mainMenuItems.length; i++) {
                            var item = $scope.layout.mainMenuItems[i];
                            var isExpanded = isMenuExpanded(i);
                            var hasSubmenu = item.hasSubmenu && item.submenuItems && item.submenuItems.length > 0;
                            
                            var menuItem = '<div class="menu-item-wrapper">';
                            menuItem += '<a class="menu-item ' + (hasSubmenu ? 'has-submenu' : '') + (isExpanded ? ' expanded' : '') + '" ';
                            menuItem += 'data-sheet-id="' + (item.target || '') + '" ';
                            menuItem += 'data-label="' + item.label + '" ';
                            menuItem += 'data-menu-index="' + i + '" ';
                            menuItem += 'data-clear-filters="' + (item.clearFilters || false) + '">';
                            menuItem += getIconHtml(item.iconUrl, item.label);
                            menuItem += '<span class="menu-label">' + item.label + '</span>';
                            menuItem += getBadgeHtml(item.badgeText, item.badgeColor);
                            if (hasSubmenu) {
                                menuItem += '<span class="expand-icon ' + (isExpanded ? 'expanded' : '') + '" data-menu-index="' + i + '">' + (isExpanded ? '−' : '+') + '</span>';
                            }
                            menuItem += '</a>';
                            
                            // Add submenu if exists and expanded
                            if (hasSubmenu) {
                                menuItem += '<div class="submenu ' + (isExpanded ? 'expanded' : '') + '">';
                                for (var j = 0; j < item.submenuItems.length; j++) {
                                    var subItem = item.submenuItems[j];
                                    menuItem += '<a class="submenu-item" ';
                                    menuItem += 'data-sheet-id="' + (subItem.target || '') + '" ';
                                    menuItem += 'data-label="' + subItem.label + '" ';
                                    menuItem += 'data-clear-filters="' + (subItem.clearFilters || false) + '">';
                                    menuItem += getIconHtml(subItem.iconUrl, subItem.label);
                                    menuItem += '<span class="menu-label">' + subItem.label + '</span>';
                                    menuItem += getBadgeHtml(subItem.badgeText, subItem.badgeColor);
                                    menuItem += '</a>';
                                }
                                menuItem += '</div>';
                            }
                            
                            menuItem += '</div>';
                            mainContainer.append(menuItem);
                        }
                    } else {
                        mainContainer.html('<div class="empty-state"><p>No menu items</p><small>Add items in settings</small></div>');
                    }
                    
                    // Clear and update bottom menu items
                    bottomContainer.empty();
                    if ($scope.layout.bottomMenuItems && $scope.layout.bottomMenuItems.length > 0) {
                        for (var i = 0; i < $scope.layout.bottomMenuItems.length; i++) {
                            var item = $scope.layout.bottomMenuItems[i];
                            var menuItem = '<a class="menu-item" data-sheet-id="' + (item.target || '') + '" data-label="' + item.label + '">';
                            menuItem += getIconHtml(item.iconUrl, item.label);
                            menuItem += '<span class="menu-label">' + item.label + '</span>';
                            menuItem += '</a>';
                            bottomContainer.append(menuItem);
                        }
                    }
                    
                    // Re-bind click events for menu items (основной клик на элемент)
                    $('#modern-nav-global .menu-item').off('click').on('click', function(e) {
                        // Если клик был по кнопке раскрытия, не обрабатываем
                        if ($(e.target).hasClass('expand-icon')) {
                            return;
                        }
                        
                        var target = $(this).data('sheet-id');
                        var clearFilters = $(this).data('clear-filters') === true || $(this).data('clear-filters') === 'true';
                        
                        // Если у элемента есть target (URL или Sheet ID), переходим
                        if (target) {
                            var allItems = ($scope.layout.mainMenuItems || []).concat($scope.layout.bottomMenuItems || []);
                            var foundItem = null;
                            
                            for (var i = 0; i < allItems.length; i++) {
                                if (allItems[i].target === target) {
                                    foundItem = allItems[i];
                                    break;
                                }
                            }
                            
                            if (foundItem) {
                                if (clearFilters) {
                                    foundItem.clearFilters = true;
                                }
                                $scope.navigateGlobal(foundItem);
                            }
                        }
                    });
                    
                    // Re-bind click events for submenu items
                    $('#modern-nav-global .submenu-item').off('click').on('click', function() {
                        var target = $(this).data('sheet-id');
                        var clearFilters = $(this).data('clear-filters') === true || $(this).data('clear-filters') === 'true';
                        
                        var allSubmenuItems = [];
                        var mainMenuItems = $scope.layout.mainMenuItems || [];
                        for (var i = 0; i < mainMenuItems.length; i++) {
                            if (mainMenuItems[i].submenuItems) {
                                allSubmenuItems = allSubmenuItems.concat(mainMenuItems[i].submenuItems);
                            }
                        }
                        
                        var foundItem = null;
                        for (var i = 0; i < allSubmenuItems.length; i++) {
                            if (allSubmenuItems[i].target === target) {
                                foundItem = allSubmenuItems[i];
                                break;
                            }
                        }
                        
                        if (foundItem) {
                            if (clearFilters) {
                                foundItem.clearFilters = true;
                            }
                            $scope.navigateGlobal(foundItem);
                        }
                    });
                    
                    // Re-bind click events for expand buttons only
                    $('#modern-nav-global .expand-icon').off('click').on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        var menuIndex = $(this).data('menu-index');
                        if (menuIndex !== undefined) {
                            if (window.modernMenuState.isCollapsed) {
                                // В collapsed режиме показываем tooltip с подменю
                                showSubmenuTooltip($(this), menuIndex);
                            } else {
                                // В обычном режиме раскрываем подменю
                                $scope.toggleSubmenu(menuIndex);
                                var newText = isMenuExpanded(menuIndex) ? '−' : '+';
                                $(this).text(newText);
                            }
                        }
                    });
                    
                    // Update active state only if menu exists and not navigating
                    if ($('#modern-nav-global').length > 0 && (!window.modernMenuState || !window.modernMenuState.navigating)) {
                        setTimeout(function() {
                            var currentSheetId = qlik.navigation.getCurrentSheetId().sheetId;
                            $('#modern-nav-global .menu-item, #modern-nav-global .submenu-item').removeClass('active');
                            $('#modern-nav-global .menu-item[data-sheet-id="' + currentSheetId + '"], #modern-nav-global .submenu-item[data-sheet-id="' + currentSheetId + '"]').addClass('active');
                        }, 50);
                    }
                    
                    // Add tooltip positioning for collapsed state
                    if (window.modernMenuState && window.modernMenuState.isCollapsed) {
                        $('#modern-nav-global .menu-item').on('mouseenter', function() {
                            var $this = $(this);
                            var rect = this.getBoundingClientRect();
                            var tooltipTop = rect.top + (rect.height / 2);
                            
                            $this.attr('style', '--tooltip-top: ' + tooltipTop + 'px');
                        });
                    }
                }
                
                // Create global sidebar (only once)
                function createGlobalSidebar() {
                    // Check if sidebar already exists
                    if ($('#modern-nav-global').length > 0) {
                        // Just update items if sidebar exists
                        updateMenuItems();
                        // Restore collapsed state
                        var sidebar = $('#modern-nav-global');
                        var sheet = $('.qv-panel-sheet');
                        if (window.modernMenuState && window.modernMenuState.isCollapsed) {
                            sidebar.addClass('collapsed');
                            sheet.removeClass('modern-menu-shifted').addClass('modern-menu-shifted-collapsed');
                        } else {
                            sidebar.removeClass('collapsed');
                            sheet.removeClass('modern-menu-shifted-collapsed').addClass('modern-menu-shifted');
                        }
                        return;
                    }
                    
                    // Initialize state
                    window.modernMenuState = window.modernMenuState || {
                        isCollapsed: $scope.layout.startCollapsed || false,
                        expandedMenus: []
                    };
                    
                    // Find the sheet container to position sidebar correctly
                    var sheetContainer = $('.qv-panel-sheet');
                    var qlikHeader = $('.qv-panel-header');
                    var sheetTop = 50; // Стандартный отступ для Qlik header
                    
                    // Попытаемся найти точную высоту header Qlik
                    if (qlikHeader.length > 0) {
                        sheetTop = qlikHeader.height() || 50;
                    } else {
                        // Альтернативный поиск header
                        var header = $('.header, .qlik-header, .qv-header');
                        if (header.length > 0) {
                            sheetTop = header.height() || 50;
                        }
                    }
                    
                    // Create search HTML if enabled
                    var searchHtml = '';
                    if ($scope.layout.enableSearch) {
                        searchHtml = '<div class="search-container">';
                        searchHtml += '<input type="text" class="search-input" placeholder="' + ($scope.layout.searchPlaceholder || 'Search') + '" id="menu-search-input">';
                        searchHtml += '<div class="search-icon">';
                        searchHtml += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
                        searchHtml += '<circle cx="11" cy="11" r="8"></circle>';
                        searchHtml += '<path d="m21 21-4.35-4.35"></path>';
                        searchHtml += '</svg>';
                        searchHtml += '</div>';
                        searchHtml += '<button class="filter-btn" title="Filter">';
                        searchHtml += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
                        searchHtml += '<polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>';
                        searchHtml += '</svg>';
                        searchHtml += '</button>';
                        searchHtml += '</div>';
                    }
                    
                    // Create sidebar HTML с правильным позиционированием
                    var sidebarHtml = '<div id="modern-nav-global" class="modern-sidebar-global ' + (window.modernMenuState.isCollapsed ? 'collapsed' : '') + '" style="top: ' + sheetTop + 'px; height: calc(100vh - ' + sheetTop + 'px);">';
                    sidebarHtml += '<div class="sidebar-header">';
                    sidebarHtml += '<div class="logo-wrapper">';
                    sidebarHtml += '<img src="' + ($scope.layout.logoUrl || $scope.getDefaultLogo()) + '" class="logo-image" onerror="this.src=\'' + $scope.getDefaultLogo() + '\'">';
                    sidebarHtml += '<span class="logo-text">' + ($scope.layout.companyName || 'Doclines') + '</span>';
                    sidebarHtml += '</div>';
                    sidebarHtml += '<button class="toggle-btn" id="global-toggle-btn">';
                    sidebarHtml += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
                    sidebarHtml += '<path d="M15 18l-6-6 6-6"/>';
                    sidebarHtml += '</svg>';
                    sidebarHtml += '</button>';
                    sidebarHtml += '</div>';
                    sidebarHtml += searchHtml;
                    sidebarHtml += '<div class="menu-section main" id="main-menu-container">';
                    sidebarHtml += '<!-- Main menu items will be inserted here -->';
                    sidebarHtml += '</div>';
                    sidebarHtml += '<div class="menu-section bottom" id="bottom-menu-container">';
                    sidebarHtml += '<!-- Bottom menu items will be inserted here -->';
                    sidebarHtml += '</div>';
                    sidebarHtml += '</div>';
                    
                    // Append to body
                    $('body').append(sidebarHtml);
                    
                    // Add animation class after creation for initial animation only
                    setTimeout(function() {
                        $('#modern-nav-global').addClass('animated-in');
                    }, 10);
                    
                    // Populate menu items
                    updateMenuItems();
                    
                    // Bind toggle button (only once)
                    $('#global-toggle-btn').off('click').on('click', function() {
                        $scope.toggleGlobalSidebar();
                    });
                    
                    // Bind search functionality
                    if ($scope.layout.enableSearch) {
                        $('#menu-search-input').on('input', function() {
                            $scope.searchMenu($(this).val());
                        });
                        
                        // Clear search on escape
                        $('#menu-search-input').on('keydown', function(e) {
                            if (e.keyCode === 27) { // Escape key
                                $(this).val('');
                                $scope.searchMenu('');
                            }
                        });
                    }
                    
                    // Apply initial sheet shift
                    setTimeout(function() {
                        if (!window.modernMenuState.isCollapsed) {
                            $('.qv-panel-sheet').addClass('modern-menu-shifted');
                        } else {
                            $('.qv-panel-sheet').addClass('modern-menu-shifted-collapsed');
                        }
                    }, 100);
                }
                
                // Initialize after DOM ready
                $(document).ready(function() {
                    setTimeout(createGlobalSidebar, 100);
                });
                
                // Update menu on layout changes (without recreating)
                $scope.$watch('layout.mainMenuItems', function(newVal, oldVal) {
                    if (newVal !== oldVal && $('#modern-nav-global').length > 0) {
                        updateMenuItems();
                    }
                }, true);
                
                $scope.$watch('layout.bottomMenuItems', function(newVal, oldVal) {
                    if (newVal !== oldVal && $('#modern-nav-global').length > 0) {
                        updateMenuItems();
                    }
                }, true);
                
                $scope.$watch('layout.enableSearch', function(newVal, oldVal) {
                    if (newVal !== oldVal && $('#modern-nav-global').length > 0) {
                        // Recreate sidebar when search setting changes
                        $('#modern-nav-global').remove();
                        setTimeout(createGlobalSidebar, 100);
                    }
                });
            }]
        };
    });