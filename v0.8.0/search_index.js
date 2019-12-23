var documenterSearchIndex = {"docs":
[{"location":"functions/#","page":"Functions","title":"Functions","text":"These functions constitute the main interface for working with OmniSci. If a function is not exported for the package, the assumption is that an end-user shouldn't need to use it. If you find otherwise, please open an issue for discussion.","category":"page"},{"location":"functions/#Authentication-1","page":"Functions","title":"Authentication","text":"","category":"section"},{"location":"functions/#","page":"Functions","title":"Functions","text":"connect\ndisconnect","category":"page"},{"location":"functions/#Sockets.connect","page":"Functions","title":"Sockets.connect","text":"connect(host::String, port::Int, user::String, passwd::String, dbname::String)\n\nConnect to an OmniSci database.\n\nExamples\n\njulia> conn = connect(\"localhost\", 6274, \"admin\", \"HyperInteractive\", \"omnisci\")\nConnected to localhost:6274\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.disconnect","page":"Functions","title":"OmniSci.disconnect","text":"disconnect(conn::OmniSciConnection)\n\nClose connection to OmniSci database.\n\nExamples\n\njulia> disconnect(conn)\nConnection to localhost:6274 closed\n\n\n\n\n\n","category":"function"},{"location":"functions/#Querying-Data-1","page":"Functions","title":"Querying Data","text":"","category":"section"},{"location":"functions/#","page":"Functions","title":"Functions","text":"sql_execute\nsql_execute_df\nsql_execute_gdf","category":"page"},{"location":"functions/#OmniSci.sql_execute","page":"Functions","title":"OmniSci.sql_execute","text":"sql_execute(conn::OmniSciConnection, query::String; first_n::Int = -1, at_most_n::Int = -1, as_df::Bool = true)\n\nExecute a SQL query.\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.sql_execute_df","page":"Functions","title":"OmniSci.sql_execute_df","text":"sql_execute_df(conn::OmniSciConnection, query::String, device_type::Int, device_id::Int, first_n::Int = -1)\n\nExecute a SQL query using Apache Arrow IPC (CPU). This method requires running the code in the same environment where OmniSci is running. This method is currently unsupported, until such time when Julia can read Arrow buffers.\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.sql_execute_gdf","page":"Functions","title":"OmniSci.sql_execute_gdf","text":"sql_execute_gdf(conn::OmniSciConnection, query::String, device_id::Int; first_n::Int = -1)\n\nExecute a SQL query using Apache Arrow IPC (GPU). This method requires running the code in the same environment where OmniSci is running. This method is currently unsupported, until such time when Julia can read Arrow buffers.\n\n\n\n\n\n","category":"function"},{"location":"functions/#Loading-Data-1","page":"Functions","title":"Loading Data","text":"","category":"section"},{"location":"functions/#","page":"Functions","title":"Functions","text":"create_table\nload_table\nload_table_binary_columnar\nload_table_binary_arrow","category":"page"},{"location":"functions/#OmniSci.create_table","page":"Functions","title":"OmniSci.create_table","text":"create_table(conn::OmniSciConnection, table_name::String, df::DataFrame; dryrun::Bool = false, precision::Tuple{Int,Int} = (0,0))\n\nCreate a table in the database specified during authentication. This method takes a Julia DataFrame, reads the column types and creates the equivalent create table statement, optionally printing the create table statement instead of executing the statement using sql_execute method.\n\nNote: This method is for convenience purposes only! It does not guarantee an optimized table statement. Additionally, if Decimal columns present in 'df', user must set precision/scale via the 'precision' argument.\n\nExamples\n\njulia> create_table(conn, \"test\", df)\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.load_table","page":"Functions","title":"OmniSci.load_table","text":"load_table(conn::OmniSciConnection, table_name::String, rows::Vector{TStringRow})\n\n\n\n\n\nload_table(conn::OmniSciConnection, table_name::String, rows)\n\nLoad a Tables.jl table into OmniSci. This method loads data row-wise, converting data elements to string before upload. Currently, this method requires the table to already exist on OmniSci.\n\nExamples\n\njulia> load_table(conn, \"test\", df)\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.load_table_binary_columnar","page":"Functions","title":"OmniSci.load_table_binary_columnar","text":"load_table_binary_columnar(conn::OmniSciConnection, table_name::String, cols::Vector{TColumn})\n\n\n\n\n\nload_table_binary_columnar(conn::OmniSciConnection, table_name::String, tbl_obj)\n\nLoad a Tables.jl table into OmniSci. This method loads data column-wise, and should be used instead of load_table unless you encounter an error, as the load should be considerably faster. Currently, this method requires the table to already exist on OmniSci.\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.load_table_binary_arrow","page":"Functions","title":"OmniSci.load_table_binary_arrow","text":"load_table_binary_arrow(conn::OmniSciConnection, table_name::String, arrow_stream::Vector{UInt8})\n\n\n\n\n\n","category":"function"},{"location":"functions/#Dashboards-1","page":"Functions","title":"Dashboards","text":"","category":"section"},{"location":"functions/#","page":"Functions","title":"Functions","text":"get_dashboards\nget_dashboard_grantees\nrender_vega","category":"page"},{"location":"functions/#OmniSci.get_dashboards","page":"Functions","title":"OmniSci.get_dashboards","text":"get_dashboards(conn::OmniSciConnection; as_df::Bool = true)\n\nGets dashboards that user submitted during connect() can access.\n\nExamples\n\njulia> getdbs = get_dashboards(conn)\n7×8 DataFrame. Omitted printing of 3 columns\n│ Row │ dashboard_id │ dashboard_metadata │ dashboard_name │ dashboard_owner │ dashboard_state │\n│     │ Int32        │ String             │ String         │ String          │ String          │\n├─────┼──────────────┼────────────────────┼────────────────┼─────────────────┼─────────────────┤\n│ 1   │ 9            │ metadata           │ 0vcAQEO1ZD     │ mapd            │                 │\n│ 2   │ 6            │ metadata           │ QI0JsthBsB     │ mapd            │                 │\n│ 3   │ 5            │ metadata           │ Srm72rCJHa     │ mapd            │                 │\n│ 4   │ 4            │ metadata           │ sO0XgMUOZH     │ mapd            │                 │\n│ 5   │ 1            │ metadata           │ testdash       │ mapd            │                 │\n│ 6   │ 2            │ metadata           │ testdash2      │ mapd            │                 │\n│ 7   │ 3            │ metadata           │ testdash3      │ mapd            │                 │\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.get_dashboard_grantees","page":"Functions","title":"OmniSci.get_dashboard_grantees","text":"get_dashboard_grantees(conn::OmniSciConnection, dashboard_id::Integer)\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.render_vega","page":"Functions","title":"OmniSci.render_vega","text":"render_vega(conn::OmniSciConnection, vega_json::String, compression_level::Int = 0)\n\nRender an OmniSci-flavored Vega specification using the backend rendering engine. Note that OmniSci does not currently support the full Vega specification; this method is mostly useful for rendering choropleths and related geospatial charts.\n\ncompression_level ranges from 0 (low compression, faster) to 9 (high compression, slower).\n\nExamples\n\njulia> vg = {\"width\" : 1024, \"height\" : 1024...}\n\njulia> vega_json = render_vega(conn, vg)\n\n\n\n\n\n","category":"function"},{"location":"functions/#Metadata-1","page":"Functions","title":"Metadata","text":"","category":"section"},{"location":"functions/#","page":"Functions","title":"Functions","text":"get_tables_meta\nget_table_details\nget_databases\nget_users\nget_roles\nget_hardware_info\nget_status\nget_all_roles_for_user","category":"page"},{"location":"functions/#OmniSci.get_tables_meta","page":"Functions","title":"OmniSci.get_tables_meta","text":"get_tables_meta(conn::OmniSciConnection; as_df::Bool = true)\n\nGet metadata for tables in database specified in connect().\n\nExamples\n\njulia> metad = get_tables_meta(conn)\n5×6 DataFrame\n│ Row │ is_replicated │ is_view │ max_rows            │ num_cols │ shard_count │ table_name        │\n│     │ Bool          │ Bool    │ Int64               │ Int64    │ Int64       │ String            │\n├─────┼───────────────┼─────────┼─────────────────────┼──────────┼─────────────┼───────────────────┤\n│ 1   │ false         │ false   │ 4611686018427387904 │ 4        │ 0           │ omnisci_states    │\n│ 2   │ false         │ false   │ 4611686018427387904 │ 6        │ 0           │ omnisci_counties  │\n│ 3   │ false         │ false   │ 4611686018427387904 │ 64       │ 0           │ omnisci_countries │\n│ 4   │ false         │ false   │ 4611686018427387904 │ 4        │ 0           │ test2             │\n│ 5   │ false         │ false   │ 4611686018427387904 │ 4        │ 0           │ test              │\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.get_table_details","page":"Functions","title":"OmniSci.get_table_details","text":"get_table_details(conn::OmniSciConnection, table_name::String; as_df::Bool = true)\n\nGet table details such as column names and types.\n\nExamples\n\njulia> tbl_detail = get_table_details(conn, \"omnisci_states\")\n4×21 DataFrame. Omitted printing of 15 columns\n│ Row │ col_name    │ col_type     │ comp_param │ encoding │ is_array │ is_physical │\n│     │ String      │ DataType     │ Int32      │ String   │ Bool     │ Bool        │\n├─────┼─────────────┼──────────────┼────────────┼──────────┼──────────┼─────────────┤\n│ 1   │ id          │ String       │ 32         │ Dict     │ false    │ false       │\n│ 2   │ abbr        │ String       │ 32         │ Dict     │ false    │ false       │\n│ 3   │ name        │ String       │ 32         │ Dict     │ false    │ false       │\n│ 4   │ omnisci_geo │ MultiPolygon │ 32         │ GeoInt   │ false    │ false       │\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.get_databases","page":"Functions","title":"OmniSci.get_databases","text":"get_databases(conn::OmniSciConnection; as_df::Bool=true)\n\nGet list of databases.\n\nExamples\n\njulia> db = get_databases(conn)\n1×2 DataFrame\n│ Row │ db_name │ db_owner │\n│     │ String  │ String   │\n├─────┼─────────┼──────────┤\n│ 1   │ mapd    │ mapd     │\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.get_users","page":"Functions","title":"OmniSci.get_users","text":"get_users(conn::OmniSciConnection; as_df::Bool = true)\n\nGet list of users who have access to database specified in connect().\n\nExamples\n\njulia> users = get_users(conn)\n1×1 DataFrame\n│ Row │ users  │\n│     │ String │\n├─────┼────────┤\n│ 1   │ mapd   │\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.get_roles","page":"Functions","title":"OmniSci.get_roles","text":"get_roles(conn::OmniSciConnection; as_df::Bool = true)\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.get_hardware_info","page":"Functions","title":"OmniSci.get_hardware_info","text":"get_hardware_info(conn::OmniSciConnection)\n\nDisplays selected properties of hardware where OmniSci running, such as GPU and CPU information.\n\nExamples\n\njulia> hardware = get_hardware_info(conn)\nOmniSci.TClusterHardwareInfo(OmniSci.THardwareInfo[THardwareInfo(0, 12, 0, 0, \"\", OmniSci.TGpuSpecification[])])\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.get_status","page":"Functions","title":"OmniSci.get_status","text":"get_status(conn::OmniSciConnection)\n\nDisplays properties of OmniSci server, such as version and rendering capabilities.\n\nExamples\n\njulia> status = get_status(conn)\nOmniSci.TServerStatus\n\n  read_only: false\n  version: 4.1.3-20180926-66c2aee949\n  rendering_enabled: false\n  start_time: 1540579280\n  edition: ce\n  host_name: aggregator\n  poly_rendering_enabled: false\n\n\n\n\n\n","category":"function"},{"location":"functions/#OmniSci.get_all_roles_for_user","page":"Functions","title":"OmniSci.get_all_roles_for_user","text":"get_all_roles_for_user(conn::OmniSciConnection, userName::String; as_df::Bool = true)\n\n\n\n\n\n","category":"function"},{"location":"apireference/#Index-1","page":"API Reference","title":"Index","text":"","category":"section"},{"location":"apireference/#","page":"API Reference","title":"API Reference","text":"","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"OmniSci.jl is a pure-Julia client for the OmniSci GPU-accelerated database engine and analysis platform. The goal of this package is to utilize the type-system of Julia to make working with OmniSci seamless.","category":"page"},{"location":"#Installation-1","page":"Getting Started","title":"Installation","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"using Pkg\nPkg.add(\"OmniSci\")","category":"page"},{"location":"#Setting-up-an-OmniSci-Database-1","page":"Getting Started","title":"Setting up an OmniSci Database","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"The easiest way to get started with OmniSci is to use the provided Docker containers (CPU/GPU):","category":"page"},{"location":"#CPU-1","page":"Getting Started","title":"CPU","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"docker run \\\n-d \\\n--name omnisci \\\n-p 6274:6274 \\\n--ipc=host \\\n-v /home/<username>/omnisci-storage:/omnisci-storage \\\nomnisci/core-os-cpu","category":"page"},{"location":"#GPU-1","page":"Getting Started","title":"GPU","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"docker run \\\n-d \\\n--name omnisci \\\n-p 6274:6274 \\\n--ipc=host \\\n-v /home/<username>/omnisci-storage:/omnisci-storage \\\nomnisci/core-os-cuda","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"For basic OmniSci.jl development, the CPU-only build is sufficient and will allow users to use OmniSci without requiring an NVIDIA GPU. For GPU-accelerated OmniSci, use the Docker container with CUDA support.","category":"page"},{"location":"#Authentication-1","page":"Getting Started","title":"Authentication","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"The first step in using OmniSci.jl is to authenticate against an OmniSci database. Currently, OmniSci.jl only implements the binary transfer protocol from Apache Thrift (i.e. port must equal 6274 or whichever port accepts binary connections); http[s] support to be developed at a later date.","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"Using the default login credentials for a new OmniSci install:","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"julia> using OmniSci\n\njulia> conn = connect(\"localhost\", 6274, \"admin\", \"HyperInteractive\", \"omnisci\")\nConnected to localhost:6274","category":"page"},{"location":"#Usage-1","page":"Getting Started","title":"Usage","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"Once authenticated, use the conn object as the first argument for each method in the package:","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"julia> tbl = get_tables_meta(conn)\n5×6 DataFrame\n│ Row │ is_replicated │ is_view │ max_rows            │ num_cols │ shard_count │ table_name        │\n│     │ Bool          │ Bool    │ Int64               │ Int64    │ Int64       │ String            │\n├─────┼───────────────┼─────────┼─────────────────────┼──────────┼─────────────┼───────────────────┤\n│ 1   │ false         │ false   │ 4611686018427387904 │ 4        │ 0           │ omnisci_states    │\n│ 2   │ false         │ false   │ 4611686018427387904 │ 6        │ 0           │ omnisci_counties  │\n│ 3   │ false         │ false   │ 4611686018427387904 │ 64       │ 0           │ omnisci_countries │\n│ 4   │ false         │ false   │ 4611686018427387904 │ 4        │ 0           │ test2             │\n│ 5   │ false         │ false   │ 4611686018427387904 │ 4        │ 0           │ test              │","category":"page"},{"location":"devdocs/#","page":"Contributing / Developer Docs","title":"Contributing / Developer Docs","text":"OmniSci.jl is an Apache 2.0 licensed library, and as such, we welcome any and all contributions! From the most trivial typo to adding sections to this documentation, or even bug fixes and new features are greatly appreciated.","category":"page"},{"location":"devdocs/#","page":"Contributing / Developer Docs","title":"Contributing / Developer Docs","text":"It is suggested, but not required, that you create a GitHub issue before contributing a feature or bug fix. This is so that other developers 1) know that you are working on the feature/issue and 2) that internal OmniSci experts can help you navigate any database-specific logic that may not be obvious within the package. All patches should be submitted as pull requests, and upon passing the test suite and review by OmniSci, will be merged to master for release as part of the next package release cycle.","category":"page"},{"location":"devdocs/#Updating-Thrift-Bindings-1","page":"Contributing / Developer Docs","title":"Updating Thrift Bindings","text":"","category":"section"},{"location":"devdocs/#","page":"Contributing / Developer Docs","title":"Contributing / Developer Docs","text":"The core functionality of this package relies on Apache Thrift to pass and receive messages from an OmniSciDB backend. While a discussion of the mechanics of Apache Thrift is beyond the scope of this documentation, what is important to note is that as the OmniSciDB project changes its Thrift specification (files with a .thrift extension), the auto-generated bindings from Thrift,jl need to be updated here.","category":"page"},{"location":"devdocs/#","page":"Contributing / Developer Docs","title":"Contributing / Developer Docs","text":"Because of quirks in the Julia Thrift.jl package (mainly, no forward declaration/mutually referential types), updating the Thrift bindings does require manual intervention. If attempting to update the bindings, take note of commented out code in the existing definition, which usually means that either the order of the struct definition needed to be changed or that the struct itself needed to be changed.","category":"page"}]
}
