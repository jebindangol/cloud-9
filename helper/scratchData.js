const sampleProducts = [
    {
        _id: '111-001',
        category_id: '004001001',
        brand_id: '0003',
        name: 'kshitij testing local',
        image: {
            thumbnail: 'https://picsum.photos/id/1/300/300',
            desktop_full: 'https://picsum.photos/id/1/600/600'
        },
        price: {
            label: '$9.9',
            currency: 'USD',
            amount: '9.9'
        },
        inventory: {
            store_quantity: 19
        },
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        sale: {
            was_label: '$11.00',
            type: 'percentage',
            discount_amount: '10',
            start_timestamp: '1675487345',
            end_timestamp: '1707023344'
        },
        relatedProductIds: [129, 121, 126, 127, 129, 121],
        review: {
            average_rating: 4.5,
            review_count: 1,
            user_review: [
                {
                    user_id: 101,
                    comment: 'This is a good product',
                    rating: 4.5
                }
            ]
        }
    }
];


export const vapeCategory = [
    {
        _id: '001',
        label: 'Vape',
        key: 'vape',
        url: '/products/vape',
        sub_categories: [
            {
                _id: '3f73b239-8b57-55ce-4558-987103cab912',
                key: 'Elf Bar',
                label: 'Elf Bar',
                url: '/products/vape/elf-bar'
            },
            {
                _id: '0ebd950e-8201-e259-dd58-59af281a80a4',
                key: 'Lost Mary',
                label: 'Lost Mary',
                url: '/products/vape/lost-mary'
            },
            {
                _id: 'c94d4ac0-af0b-6605-4bad-74a9181fc021',
                key: 'Esco Bar',
                label: 'Esco Bar',
                url: '/products/vape/esco-bar'
            },
            {
                _id: '92eadac4-c30a-dfe8-fdf2-aed63d249fd9',
                key: 'Foger',
                label: 'Foger',
                url: '/products/vape/foger'
            },
            {
                _id: '591e6b3c-326c-12ad-415f-166bff499b7a',
                key: 'Sili',
                label: 'Sili',
                url: '/products/vape/sili'
            },
            {
                _id: '52f5f355-5c08-2dc4-b5a0-5296b6542b5c',
                key: 'Air Love',
                label: 'Air Love',
                url: '/products/vape/air-love'
            },
            {
                _id: '6b1f6605-f0f7-6bd5-4e4f-bed63fc7735f',
                key: 'Air Max',
                label: 'Air Max',
                url: '/products/vape/air-max'
            },
            {
                _id: 'f72af971-2854-4c33-895d-57cdf5da0d4a',
                key: 'Max Air',
                label: 'Max Air',
                url: '/products/vape/max-air'
            },
            {
                _id: '1b727649-2c17-8c67-5d11-e3a80dc7d709',
                key: 'Funky Republic',
                label: 'Funky Republic',
                url: '/products/vape/funky-republic'
            },
            {
                _id: '2661b782-18f9-ccc2-0636-b14e327560e1',
                key: 'Uno',
                label: 'Uno',
                url: '/products/vape/Uno'
            },
            {
                _id: '83d78cd8-3da1-8d92-b788-a1ca29f21d64',
                key: 'Glamee',
                label: 'Glamee',
                url: '/products/vape/sili'
            },
            {
                _id: 'af691eff-c82d-cb10-bec0-791539660d4c',
                key: 'Ignite',
                label: 'Ignite',
                url: '/products/vape/ignite'
            },
            {
                _id: '76dc456e-3ff1-0aec-8b5a-d347bafbb32f',
                key: 'Orion',
                label: 'Orion',
                url: '/products/vape/orion'
            },
            {
                _id: 'ae1457d7-39e9-e438-95ad-dc6aadea6eda',
                key: 'Starburst',
                label: 'Starburst',
                url: '/products/vape/starburst'
            }
        ]
    }
];

export const vapeBrands = [
    {
        _id: '3f73b239-8b57-55ce-4558-987103cab912',
        key: 'Elf Bar',
        label: 'Elf Bar',
        url: '/products/vape/elf-bar'
    },
    {
        _id: '0ebd950e-8201-e259-dd58-59af281a80a4',
        key: 'Lost Mary',
        label: 'Lost Mary',
        url: '/products/vape/lost-mary'
    },
    {
        _id: 'c94d4ac0-af0b-6605-4bad-74a9181fc021',
        key: 'Esco Bar',
        label: 'Esco Bar',
        url: '/products/vape/esco-bar'
    },
    {
        _id: '92eadac4-c30a-dfe8-fdf2-aed63d249fd9',
        key: 'Foger',
        label: 'Foger',
        url: '/products/vape/foger'
    },
    {
        _id: '591e6b3c-326c-12ad-415f-166bff499b7a',
        key: 'Sili',
        label: 'Sili',
        url: '/products/vape/sili'
    },
    {
        _id: '52f5f355-5c08-2dc4-b5a0-5296b6542b5c',
        key: 'Air Love',
        label: 'Air Love',
        url: '/products/vape/air-love'
    },
    {
        _id: '6b1f6605-f0f7-6bd5-4e4f-bed63fc7735f',
        key: 'Air Max',
        label: 'Air Max',
        url: '/products/vape/air-max'
    },
    {
        _id: 'f72af971-2854-4c33-895d-57cdf5da0d4a',
        key: 'Max Air',
        label: 'Max Air',
        url: '/products/vape/max-air'
    },
    {
        _id: '1b727649-2c17-8c67-5d11-e3a80dc7d709',
        key: 'Funky Republic',
        label: 'Funky Republic',
        url: '/products/vape/funky-republic'
    },
    {
        _id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        key: 'Uno',
        label: 'Uno',
        url: '/products/vape/Uno'
    },
    {
        _id: '83d78cd8-3da1-8d92-b788-a1ca29f21d64',
        key: 'Glamee',
        label: 'Glamee',
        url: '/products/vape/sili'
    },
    {
        _id: 'af691eff-c82d-cb10-bec0-791539660d4c',
        key: 'Ignite',
        label: 'Ignite',
        url: '/products/vape/ignite'
    },
    {
        _id: '76dc456e-3ff1-0aec-8b5a-d347bafbb32f',
        key: 'Orion',
        label: 'Orion',
        url: '/products/vape/orion'
    },
    {
        _id: 'ae1457d7-39e9-e438-95ad-dc6aadea6eda',
        key: 'Starburst',
        label: 'Starburst',
        url: '/products/vape/starburst'
    }
];

export const allCategories = [
    {
        _id: '002',
        label: 'Bong',
        key: 'bong',
        url: '/products/bong',
        sub_categories: [
            {
                _id: '0081',
                key: 'dragon-glass',
                label: 'Dragon Glass',
                url: '/products/bong/dragon-glass'
            },
            {
                _id: '0082',
                key: 'cheech',
                label: 'Cheech',
                url: '/products/bong/Cheech'
            },
            {
                _id: '0083',
                key: 'clover',
                label: 'Clover',
                url: '/products/bong/clover'
            },
            {
                _id: '0084',
                key: 'black-sheep',
                label: 'Black Sheep',
                url: '/products/bong/black-sheep'
            },
            {
                _id: '0085',
                key: 'cloud-nurdz',
                label: 'Cloud Nurdz',
                url: '/products/bong/cloud-nurdz'
            },
            {
                _id: '0086',
                key: 'Ooze',
                label: 'Ooze',
                url: '/products/bong/ooze'
            },
            {
                _id: '0087',
                key: 'Limited Edition',
                label: 'Limited Edition',
                url: '/products/bong/limited-edition'
            },
            {
                _id: '0088',
                key: 'Others',
                label: 'Others',
                url: '/products/bong/others'
            }
        ]
    },
    {
        _id: '003',
        label: 'Vape Device',
        key: 'vape-device',
        url: '/products/vape-device',
        sub_categories: [
            {
                _id: '0015',
                key: 'Voopoo',
                label: 'Voopoo',
                url: '/products/brand/voopoo'
            },
            {
                _id: '0016',
                key: 'Smok',
                label: 'Smok',
                url: '/products/brand/smok'
            },
            {
                _id: '0017',
                key: 'Voporesso',
                label: 'Voporesso',
                url: '/products/brand/voporesso'
            },
            {
                _id: '0018',
                key: 'Zero',
                label: 'Zero',
                url: '/products/brand/zero'
            },
            {
                _id: '0019',
                key: 'Caliburn',
                label: 'Caliburn',
                url: '/products/brand/caliburn'
            },
            {
                _id: '0020',
                key: 'Lost Vape',
                label: 'Lost Vape',
                url: '/products/brand/lost-vape'
            },
            {
                _id: '0021',
                key: 'Pop Reel',
                label: 'Pop Reel',
                url: '/products/brand/pop-reel'
            },
            {
                _id: '0022',
                key: 'Yo Can',
                label: 'Yo Can',
                url: '/products/brand/yo-can'
            },
            {
                _id: '0023',
                key: 'Pulsar',
                label: 'Pulsar',
                url: '/products/brand/pulsar'
            },
            {
                _id: '0024',
                key: 'Lookah',
                label: 'Lookah',
                url: '/products/brand/lookah'
            },
            {
                _id: '0025',
                key: 'Ooze',
                label: 'Ooze',
                url: '/products/brand/ooze'
            },
            {
                _id: '0026',
                key: 'Leaf Buddi',
                label: 'Leaf Buddi',
                url: '/products/brand/leaf-buddi'
            },
            {
                _id: '0027',
                key: 'Mighty',
                label: 'Mighty',
                url: '/products/brand/mighty'
            },
            {
                _id: '0028',
                key: 'X Erial',
                label: 'X Erial',
                url: '/products/brand/x-reial'
            }
        ]
    },
    {
        _id: '004',
        label: 'Vape Juice',
        key: 'Vape Juice',
        url: '/products/vape-juice',
        sub_categories: [
            {
                _id: '0029',
                key: 'Twist',
                label: 'Twist',
                url: '/products/brand/twist'
            },
            {
                _id: '0030',
                key: 'VPGNS',
                label: 'VPGNS',
                url: '/products/brand/vpgns'
            },
            {
                _id: '0031',
                key: 'Naked',
                label: 'Naked',
                url: '/products/brand/naked'
            },
            {
                _id: '0032',
                key: 'Sad Boy',
                label: 'Sad Boy',
                url: '/products/brand/sad-boy'
            },
            {
                _id: '0033',
                key: 'Cloud Nurdz',
                label: 'Cloud Nurdz',
                url: '/products/brand/cloud-nurdz'
            },
            {
                _id: '0034',
                key: 'Pod Juice',
                label: 'Pod Juice',
                url: '/products/brand/pod-juice'
            },
            {
                _id: '0035',
                key: 'Costal Clouds',
                label: 'Costal Clouds',
                url: '/products/brand/postal-clouds'
            },
            {
                _id: '0036',
                key: 'Monster',
                label: 'Monster',
                url: '/products/brand/monster'
            }
        ]
    },
    {
        _id: '005',
        label: 'Pipe',
        key: 'pipes',
        url: '/products/pipe',
        sub_categories: []
    },
    {
        _id: '006',
        label: 'Cigarillo & Tobacco',
        key: 'cigarillo-tobacco',
        url: '/products/cigarillo-tobacco',
        sub_categories: [
            {
                _id: '0037',
                key: 'Swisher Sweets',
                label: 'Swisher Sweets',
                url: '/products/brand/swisher-sweets'
            },
            {
                _id: '0038',
                key: 'White Owl',
                label: 'White Owl',
                url: '/products/brand/white-owl'
            },
            {
                _id: '0039',
                key: 'Game',
                label: 'Game',
                url: '/products/brand/game'
            },
            {
                _id: '0040',
                key: 'ZIG ZAG',
                label: 'ZIG ZAG',
                url: '/products/brand/zig-zag'
            },
            {
                _id: '0041',
                key: 'Backwoods',
                label: 'Backwoods',
                url: '/products/brand/backwoods'
            },
            {
                _id: '0042',
                key: 'Dutch',
                label: 'Dutch',
                url: '/products/brand/dutch'
            },
            {
                _id: '0043',
                key: 'Show',
                label: 'Show',
                url: '/products/brand/show'
            },
            {
                _id: '0044',
                key: 'Ultra',
                label: 'Ultra',
                url: '/products/brand/ultra'
            },
            {
                _id: '0045',
                key: 'Supreme',
                label: 'Supreme',
                url: '/products/brand/zig-zag'
            },
            {
                _id: '0046',
                key: 'Good Times',
                label: 'Good Times',
                url: '/products/brand/good-times'
            },
            {
                _id: '0047',
                key: '4K',
                label: '4K',
                url: '/products/brand/4K'
            },
            {
                _id: '0048',
                key: 'Throwback',
                label: 'Throwback',
                url: '/products/brand/throwback'
            },
            {
                _id: '0049',
                key: 'Good Stuff',
                label: 'Good Stuff',
                url: '/products/brand/good-stuff'
            },
            {
                _id: '0050',
                key: 'Tin Star',
                label: 'Tin Star',
                url: '/products/brand/tin-star'
            }
        ]
    },
    {
        _id: '007',
        label: 'Paper, Wraps & Cons',
        key: 'paper-wraps-cons',
        url: '/products/paper-wraps-cons',
        sub_categories: [
            {
                _id: '0051',
                key: 'CAMO',
                label: 'Camo',
                url: '/products/brand/camo'
            },
            {
                _id: '0052',
                key: 'RAW',
                label: 'Raw',
                url: '/products/brand/raw'
            },
            {
                _id: '0053',
                key: 'Zig Zag',
                label: 'Zig Zag',
                url: '/products/brand/zig-zag'
            },
            {
                _id: '0054',
                key: 'ENDO',
                label: 'Endo',
                url: '/products/brand/endo'
            },
            {
                _id: '0055',
                key: 'Billionaire Rap',
                label: 'Billionaire Rap',
                url: '/products/brand/billionaire-rap'
            },
            {
                _id: '0056',
                key: 'Wild Hemp',
                label: 'Wild Hemp',
                url: '/products/brand/wild-hemp'
            },
            {
                _id: '0057',
                key: 'Hempire',
                label: 'Hempire',
                url: '/products/brand/hempire'
            },
            {
                _id: '0058',
                key: 'Hemparillo',
                label: 'Hemparillo',
                url: '/products/brand/hemparillo'
            },
            {
                _id: '0059',
                key: 'Crop Kingz',
                label: 'Crop Kingz',
                url: '/products/brand/Crop-kingz'
            },
            {
                _id: '0060',
                key: 'King Palm',
                label: 'king Palm',
                url: '/products/brand/king-palm'
            },
            {
                _id: '0061',
                key: 'Alcapone',
                label: 'Alcapone',
                url: '/products/brand/alcapone'
            },
            {
                _id: '0062',
                key: 'Afghan Hemp',
                label: 'Afghan Hemp',
                url: '/products/brand/Afghan Hemp'
            },
            {
                _id: '0063',
                key: 'Karma',
                label: 'Karma',
                url: '/products/brand/Karma'
            },
            {
                _id: '0064',
                key: 'Skunk Brand',
                label: 'Skunk Brand',
                url: '/products/brand/skunk-brand'
            },
            {
                _id: '0065',
                key: 'Banana Blunts',
                label: 'Banana Blunts',
                url: '/products/brand/banana-blunts'
            },
            {
                _id: '0066',
                key: 'Packwraps',
                label: 'Packwraps',
                url: '/products/brand/packwraps'
            },
            {
                _id: '0067',
                key: 'Runtz',
                label: 'Runtz',
                url: '/products/brand/runtz'
            },
            {
                _id: '0068',
                key: 'Slapwoods',
                label: 'Slapwoods',
                url: '/products/brand/slapwoods'
            },
            {
                _id: '0069',
                key: 'Fonto Leaf Master',
                label: 'Fonto Leaf Master',
                url: '/products/brand/fonto-leaf-master'
            },
            {
                _id: '0070',
                key: 'Grabba Leaf',
                label: 'Grabba Leaf',
                url: '/products/brand/grabbaleaf'
            },
            {
                _id: '0071',
                key: 'High Hemp',
                label: 'High Hemp',
                url: '/products/brand/high-hemp'
            },
            {
                _id: '0072',
                key: 'Pop',
                label: 'Pop',
                url: '/products/brand/pop'
            },
            {
                _id: '0073',
                key: 'Cyclones',
                label: 'Cyclones',
                url: '/products/brand/cyclones'
            },
            {
                _id: '0074',
                key: 'Job',
                label: 'Job',
                url: '/products/brand/job'
            },
            {
                _id: '0075',
                key: 'Blazy Susan',
                label: 'Blazy Susan',
                url: '/products/brand/balzy-susan'
            },
            {
                _id: '0076',
                key: 'Afghan Hemp',
                label: 'Afghan Hemp',
                url: '/products/brand/Afghan Hemp'
            },
            {
                _id: '0077',
                key: 'Juicy Jay',
                label: 'Juicy Jay',
                url: '/products/brand/juicy-jay'
            },
            {
                _id: '0078',
                key: 'Element Trip',
                label: 'Element Trip',
                url: '/products/brand/element-trip'
            },
            {
                _id: '0079',
                key: 'TYSON',
                label: 'Tyson',
                url: '/products/brand/tyson'
            },
            {
                _id: '0080',
                key: 'Cake',
                label: 'Cake',
                url: '/products/brand/cake'
            }
        ]
    },

    {
        _id: '008',
        label: 'Delta',
        key: 'delta',
        url: '/products/delta',
        sub_categories: []
    },
    {
        _id: '009',
        label: 'Kratom',
        key: 'kratom',
        url: '/products/kratom',
        sub_categories: []
    },
    {
        _id: '010',
        label: 'CBD',
        key: 'cbd',
        url: '/products/cbd',
        sub_categories: []
    },
    {
        _id: '011',
        label: 'Hookah',
        key: 'hookah',
        url: '/products/hookah',
        sub_categories: []
    },
    {
        _id: '012',
        label: 'Grinder',
        key: 'grinder',
        url: '/products/grinder',
        sub_categories: []
    },
    {
        _id: '013',
        label: 'Zippo & Lighter',
        key: 'zippo-lighter',
        url: '/products/zippo-lighter',
        sub_categories: []
    },
    {
        _id: '014',
        label: 'Detox & Test Kits',
        key: 'detox-test-kits',
        url: '/products/detox-test-kits',
        sub_categories: []
    },
    {
        _id: '015',
        label: 'Bags & Gifts',
        key: 'bags-gifts',
        url: '/products/bags-gifts',
        sub_categories: []
    },
    {
        _id: '016',
        label: 'Tray',
        key: 'tray',
        url: '/products/tray',
        sub_categories: []
    },
    {
        _id: '017',
        label: 'Novelty',
        key: 'novelty',
        url: '/products/novelty',
        sub_categories: [
            {
                _id: '0094',
                key: 'Scale',
                label: 'Scale',
                url: '/products/brand/scale'
            },
            {
                _id: '0095',
                key: 'Cleaner',
                label: 'Cleaner',
                url: '/products/brand/cleaner'
            },
            {
                _id: '0096',
                key: 'Stash Jar',
                label: 'Stash Jar',
                url: '/products/brand/stash-jar'
            },
            {
                _id: '0097',
                key: 'Tattoo',
                label: 'Tattoo',
                url: '/products/brand/tattoo'
            },
            {
                _id: '0098',
                key: 'Tattoo Color',
                label: 'Tattoo Color',
                url: '/products/brand/tattoo-color'
            },

        ]
    }
];

export const elfBarProducts = [
    {
        category_id: '3f73b239-8b57-55ce-4558-987103cab912',
        brand_id: '3f73b239-8b57-55ce-4558-987103cab912',
        name: 'Elf Bar 5000',
        image: '/images/products/elf-bar.webp',
        price: {
            label: '$21.99',
            currency: 'USD',
            amount: '21.99'
        },
        inventory: {
            store_quantity: 10
        },
        description: "Elf Bar 5000 Puff Disposable Vape BC 5000 *Chargeable*. Available in different flavor ",
        sale: {
            was_label: '$21.99',
            type: 'fixed',
            discount_amount: '19.99'
        },
        relatedProductIds: [],
        review: {}
    },
    {

        category_id: '3f73b239-8b57-55ce-4558-987103cab912',
        brand_id: '3f73b239-8b57-55ce-4558-987103cab912',
        name: 'Elf Bar Zero Nicotine',
        image: '/images/products/elf-bar.webp',
        price: {
            label: '$21.99',
            currency: 'USD',
            amount: '21.99'
        },
        inventory: {
            store_quantity: 10
        },
        description: "Elf Bar 5000 Puff Disposable Vape BC 5000 *Chargeable*. Zero Nicotine",
        sale: {
            was_label: '$21.99',
            type: 'fixed',
            discount_amount: '19.99'
        },
        relatedProductIds: [],
        review: {}
    }
];

export const escoBarProducts = [
    {

        category_id: 'c94d4ac0-af0b-6605-4bad-74a9181fc021',
        brand_id: 'c94d4ac0-af0b-6605-4bad-74a9181fc021',
        name: 'Esco Bar 2500',
        image: '/images/products/esco-bar.webp',
        inventory: {
            store_quantity: 10
        },
        description: "Esco Bars by Pastel Cartel, are a 2500 puff disposable vape that features a mesh coil for outstanding flavor production. Available in different flavors ",
        relatedProductIds: [],
        review: {}
    },
    {

        category_id: 'c94d4ac0-af0b-6605-4bad-74a9181fc021',
        brand_id: 'c94d4ac0-af0b-6605-4bad-74a9181fc021',
        name: 'Esco Bar 5000',
        image: '/images/products/esco-bar.webp',
        inventory: {
            store_quantity: 10
        },
        description: "Esco Bar Mega has 14 ml of e-juice and lasts up to 5000 puffs *Chargeable*. Available in different flavors",
        relatedProductIds: [],
        review: {}
    },

];

export const unoBarProducts = [
    {
        category_id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        brand_id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        name: 'UNO MAS 1200',
        price: {
            label: '$10.00',
            currency: 'USD',
            amount: '10.00'
        },
        inventory: {
            store_quantity: 10
        },
        description: "Pre-filled disposable vape pod device that has the capacity to draw 1200 puffs per device. Available in different flavors ",
        sale: {
            was_label: '$13.99',
            type: 'fixed',
            discount_amount: '3.99'
        },
        relatedProductIds: [],
        review: {}
    },
    {
        category_id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        brand_id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        name: 'UNO Magnum 6000',

        inventory: {
            store_quantity: 10
        },
        description: "The Magnum from UNO is a new and improverd version of thier UNO 4K disposable with more tahn 6000 puffs and powered by a 1300mAh. *Chargeable*. Available in different flavors",
        relatedProductIds: [],
        review: {}
    },
    {

        category_id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        brand_id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        name: 'UNO 4K',

        inventory: {
            store_quantity: 10
        },
        description: "The UNO 4K, by Uno is a 4000 puff variant of the populor UNO Mas Bar. Available in different flavors",
        relatedProductIds: [],
        review: {}
    },
    {
        category_id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        brand_id: '2661b782-18f9-ccc2-0636-b14e327560e1',
        name: 'UNO Amped',

        inventory: {
            store_quantity: 10
        },
        description: "The UNO Amped disposable vape pod is a closed pod system pre-filled with Tobacco Free nicotine. Available in different flavors",
        relatedProductIds: [],
        review: {}
    },

];

export const lostMaryProducts = [
    {
        category_id: '0ebd950e-8201-e259-dd58-59af281a80a4',
        brand_id: '0ebd950e-8201-e259-dd58-59af281a80a4',
        name: 'Lost Mary',

        inventory: {
            store_quantity: 10
        },
        description: "Lost Mary is by ELF Bar, offering upto 5000 puffs, 5% nictotine strength and is prefilled with 13ml of nictione salt eJuice. Available in different flavors ",

        relatedProductIds: [],
        review: {}
    }
];

export const fogerProducts = [
    {
        category_id: '92eadac4-c30a-dfe8-fdf2-aed63d249fd9',
        brand_id: '92eadac4-c30a-dfe8-fdf2-aed63d249fd9',
        name: 'FOGER',
        image: '/images/products/fogers.webp',
        inventory: {
            store_quantity: 10
        },
        description: "Foger TOO differs from other devices as the liquid is contained in a tank versus a polyfill disposavle, ensuring the logevity of the coil while delivering max falvor for the duration of the 2500 puffs. Available in different flavors ",
        relatedProductIds: [],
        review: {}
    },


];

export const siliProducts = [
    {
        category_id: '591e6b3c-326c-12ad-415f-166bff499b7a',
        brand_id: '591e6b3c-326c-12ad-415f-166bff499b7a',
        name: 'SILI',

        inventory: {
            store_quantity: 10
        },
        description: "The SILI Box 6000, the first disposable vape box made by full silicone food graded material gives you extremely soft feeling. Available in different flavors ",

        relatedProductIds: [],
        review: {}
    }


];

export const airLoveProducts = [
    {
        category_id: '52f5f355-5c08-2dc4-b5a0-5296b6542b5c',
        brand_id: '52f5f355-5c08-2dc4-b5a0-5296b6542b5c',
        name: 'Air Love 4000',

        inventory: {
            store_quantity: 10
        },
        description: "Airlove is a 4000 puffs disposable vape filled with 12ml of 5% salt nic vape juice. Available in different flavors ",

        relatedProductIds: [],
        review: {}
    }


];

const airoMaxProducts = [
    {
        category_id: '52f5f355-5c08-2dc4-b5a0-5296b6542b5c',
        brand_id: '52f5f355-5c08-2dc4-b5a0-5296b6542b5c',
        name: 'Airo Max 5000',

        inventory: {
            store_quantity: 10
        },
        description: "The ELF Bar Airo Max is incredibly falvorful and provides supremely satisfying throat hits over and over again. *Chargeable* Available in different flavors ",

        relatedProductIds: [],
        review: {}
    },


];

const maxAirProducts = [
    {
        category_id: 'f72af971-2854-4c33-895d-57cdf5da0d4a',
        brand_id: 'f72af971-2854-4c33-895d-57cdf5da0d4a',
        name: 'Max Air 5000',

        inventory: {
            store_quantity: 10
        },
        description: "The Hypee Max Air is pre-filled with 13ml of 5% e-liquid, which can last up to 5000 puffs, and a 650mAh rechargeable battery. *Chargeable* Available in different flavors ",

        relatedProductIds: [],
        review: {}
    },


];

const funkyRepublicProducts = [
    {
        category_id: '1b727649-2c17-8c67-5d11-e3a80dc7d709',
        brand_id: '1b727649-2c17-8c67-5d11-e3a80dc7d709',
        name: 'Funky Republic 7000',

        inventory: {
            store_quantity: 10
        },
        description: "Funky Republic Ti7000 contains a gigantic 17ml e-liquid resevior featuring EBDESIGN liguid submerged around a mesh Quaq Tech Coil. *Chargeable* Available in different flavors ",

        relatedProductIds: [],
        review: {}
    },


];

const glameeProducts = [
    {
        category_id: '83d78cd8-3da1-8d92-b788-a1ca29f21d64',
        brand_id: '83d78cd8-3da1-8d92-b788-a1ca29f21d64',
        name: 'GLAMEE 4000',

        inventory: {
            store_quantity: 10
        },
        description: "GLAMEE 4000 is a long lasting vape device containing more than 4000 puffs, powered by 2200mAH build in battery and a huge 16ml pre-filled e-juice. Available in different flavors ",

        relatedProductIds: [],
        review: {}
    }
];

const igniteProducts = [

    {
        category_id: 'af691eff-c82d-cb10-bec0-791539660d4c',
        brand_id: 'af691eff-c82d-cb10-bec0-791539660d4c',
        name: 'IGNITE 6000',

        inventory: {
            store_quantity: 10
        },
        description: "High quality disposable vape pens with 6000 puff. Available in different flavors ",

        relatedProductIds: [],
        review: {}
    }
];

const orionProducts = [

    {
        category_id: '76dc456e-3ff1-0aec-8b5a-d347bafbb32f',
        brand_id: '76dc456e-3ff1-0aec-8b5a-d347bafbb32f',
        name: 'ORION',

        inventory: {
            store_quantity: 10
        },
        description: "Lost Vape Orion Bar 7500 puffs rechargeable disposable device with 18ml of prefilled E-juice at a 5% nicotine. Available in different flavors ",

        relatedProductIds: [],
        review: {}
    }
];

const startBrustProducts = [
    {
        category_id: 'ae1457d7-39e9-e438-95ad-dc6aadea6eda',
        brand_id: 'ae1457d7-39e9-e438-95ad-dc6aadea6eda',
        name: 'Starburst',

        inventory: {
            store_quantity: 10
        },
        description: "High quaility starurst candy eliquid juice. Available in different flavors.",

        relatedProductIds: [],
        review: {}
    }
];

export const allProducts = [
    ...elfBarProducts,
    ...escoBarProducts,
    ...unoBarProducts,
    ...lostMaryProducts,
    ...fogerProducts,
    ...siliProducts,
    ...airLoveProducts,
    ...airoMaxProducts,
    ...maxAirProducts,
    ...funkyRepublicProducts,
    ...glameeProducts,
    ...igniteProducts,
    ...orionProducts,
    ...startBrustProducts
];