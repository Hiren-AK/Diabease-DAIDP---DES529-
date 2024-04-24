#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import socket


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'diabease_server.settings')
    try:
        from django.core.management import execute_from_command_line
        # After server starts, print the access URL
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            # Try to connect to an address that does not need to exist
            s.connect(("10.255.255.255", 1))
            local_ip = s.getsockname()[0]
        print(f"\nServer is running at http://{local_ip}:8000\n")
    except KeyboardInterrupt:
        print('Shutting down the server...')
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
