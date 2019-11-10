import argparse

def get_parser():
    parser = argparse.ArgumentParser(
        description='upload photo library metadata to mongoDB',
        usage='spidy_crawler.py <photo dir> [<args>]'
        )

    parser.add_argument("ext", "e", action="append")

    parser.add_argument("network",
            choices=ethlib.NETWORK_TO_NODE_ADDRESS.keys(),
            default=EXTS
            help="Network (currency) to work with")
    parser.add_argument('command', help='Subcommand to run')

    # Parse first part of args (network+command) and save the rest for parsing later
    initial_args = sys.argv[1:3]
    leftover_args = sys.argv[3:]
    parsed_args = parser.parse_args(sys.argv[1:3])

def main():


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: %s <photo dir>" % sys.argv[0])
        sys.exit(1)

    main(sys.argv[1])

